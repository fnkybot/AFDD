<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PDMController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('app/TransformToPDM', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Normalize names to follow physical model conventions.
     *
     * @param string $name
     * @return string
     */
    private function normalizeName(string $name): string
    {
        // Zmiana na wielkie litery i zamiana spacji na podłogi
        return strtoupper(str_replace(' ', '_', $name));
    }

    /**
     * Export PDM tables as JSON.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function exportPDM(Request $request)
    {
        // Pobierz dane z pliku project.json
        $projectData = $request->input('projectData');

        if (!$projectData || !is_array($projectData)) {
            return response()->json(['error' => 'Invalid project data 0.'], 400);
        }

        // Generuj tabele PDM
        $tables = $this->buildPDM($projectData);

        // Zwróć dane tabel w formacie JSON
        return response()->json($tables, 200);
    }

    public function generatePDM(Request $request)
    {
        $projectData = $request->input('projectData');

        if (!$projectData || !is_array($projectData)) {
            return response()->json(['error' => 'Invalid project data.'], 400);
        }

        if (!isset($projectData['nodes']) && !isset($projectData['edges'])) {
            return response()->json(['error' => 'Invalid project data structure. Missing nodes or edges.'], 400);
        }

        \Log::info('Nodes:', $projectData['nodes']);


        try {
            // Tworzenie fizycznego modelu danych (PDM)
            $tables = $this->buildPDM($projectData);

            // Generowanie JSON kompatybilnego z VueFlow
            $vueFlowData = $this->generateVueFlowJSON($tables);

            if (empty($vueFlowData)) {
                return response()->json(['error' => 'Generated PDM is empty.'], 400);
            }

            return response()->json($vueFlowData, 200);
        } catch (\Exception $e) {
            \Log::error('Error generating PDM', ['error' => $e->getMessage(), 'projectData' => $projectData]);
            return response()->json(['error' => 'An error occurred while generating PDM.', 'details' => $e->getMessage()], 500);
        }
    }



    public function uploadERD(Request $request)
    {
        $erdData = null;

        if ($request->hasFile('erdFile')) {
            // Obsługa przesłania pliku JSON
            $request->validate([
                'erdFile' => 'required|file|mimes:json',
            ]);

            // Zapisz plik tymczasowo
            $path = $request->file('erdFile')->store('temp');

            // Wczytaj dane z pliku
            $erdData = json_decode(Storage::get($path), true);

            // Usuń plik tymczasowy
            Storage::delete($path);

            if (!$erdData) {
                return response()->json(['error' => 'Invalid JSON format in uploaded file.'], 400);
            }
        } elseif ($request->has('erdData')) {
            // Obsługa przesłania danych JSON jako input
            $erdData = $request->input('erdData');

            if (!$erdData || !is_array($erdData)) {
                return response()->json(['error' => 'Invalid ERD data provided.'], 400);
            }
        } else {
            return response()->json(['error' => 'No valid ERD data provided.'], 400);
        }

        // Przetwarzanie ERD na PDM
        $pdmData = $this->buildPDM($erdData);

        // Konwersja do VueFlow JSON
        $vueFlowData = $this->generateVueFlowJSON($pdmData);

        return response()->json([
            'vueFlowData' => $vueFlowData,
            'pdmData' => $pdmData,
        ], 200);
    }




    /**
     * Build Physical Data Model (PDM) from project.json nodes and edges.
     */
    private function buildPDM(array $projectData): array
    {
        $nodes = $projectData['nodes'];
        $edges = $projectData['edges'];
        $tables = [];

        // Tworzenie tabel dla encji
        foreach ($nodes as $node) {
            if ($node['type'] === 'entityType') {
                $tableName = $this->normalizeName($node['data']['label']);
                $tables[$tableName] = [
                    'name' => $tableName,
                    'columns' => []
                ];
            }
        }

        // Przypisywanie atrybutów do tabel
        foreach ($nodes as $node) {
            if ($node['type'] === 'attributeType') {
                $attributeName = $this->normalizeName($node['data']['label']);
                $attribute = [
                    'name' => $attributeName,
                    'type' => 'VARCHAR',
                    'primary' => $node['data']['isPrimaryKey'] ?? false
                ];

                // Znajdź tabelę, do której należy ten atrybut
                foreach ($edges as $edge) {
                    if ($edge['target'] === $node['id']) { // Atrybut jest połączony z encją
                        $sourceNode = collect($nodes)->firstWhere('id', $edge['source']);
                        if ($sourceNode && $sourceNode['type'] === 'entityType') {
                            $tableName = $this->normalizeName($sourceNode['data']['label']);
                            $tables[$tableName]['columns'][] = $attribute;
                        }
                    }
                }
            }
        }

        // Tworzenie tabel relacji dla wiele-do-wielu oraz dodawanie kluczy obcych
        foreach ($nodes as $node) {
            if ($node['type'] === 'relationshipType') {
                $relationshipName = $this->normalizeName($node['data']['label']);

                // Znajdź encje połączone przez relację
                $connectedEntities = [];
                foreach ($edges as $edge) {
                    if ($edge['source'] === $node['id'] || $edge['target'] === $node['id']) {
                        $relatedNode = collect($nodes)->firstWhere('id', $edge['source'] === $node['id'] ? $edge['target'] : $edge['source']);
                        if ($relatedNode && $relatedNode['type'] === 'entityType') {
                            $connectedEntities[] = $this->normalizeName($relatedNode['data']['label']);
                        }
                    }
                }

                // Jeśli relacja łączy dokładnie dwie encje
                if (count($connectedEntities) === 2) {
                    $entityA = $connectedEntities[0];
                    $entityB = $connectedEntities[1];

                    // Dodanie kluczy obcych do tabeli dla wiele-do-wielu
                    $tables[$relationshipName] = [
                        'name' => $relationshipName,
                        'columns' => [
                            [
                                'name' => $entityA . '_id',
                                'type' => 'VARCHAR',
                                'primary' => false,
                                'foreign_key' => true,
                                'references' => $entityA . '(id)'
                            ],
                            [
                                'name' => $entityB . '_id',
                                'type' => 'VARCHAR',
                                'primary' => false,
                                'foreign_key' => true,
                                'references' => $entityB . '(id)'
                            ]
                        ]
                    ];
                }
            }
        }

        // Dodanie kluczy obcych dla relacji jeden-do-wielu (1:N)
        foreach ($edges as $edge) {
            if ($edge['label'] === '1' || $edge['label'] === 'N') {
                $sourceNode = collect($nodes)->firstWhere('id', $edge['source']);
                $targetNode = collect($nodes)->firstWhere('id', $edge['target']);

                if ($sourceNode && $targetNode) {
                    if ($sourceNode['type'] === 'entityType' && $targetNode['type'] === 'entityType') {
                        $sourceTable = $sourceNode['data']['label'];
                        $targetTable = $targetNode['data']['label'];

                        // Dodaj klucz obcy do tabeli target (wielu)
                        $tables[$targetTable]['columns'][] = [
                            'name' => $sourceTable . '_ID',
                            'type' => 'VARCHAR',
                            'primary' => false,
                            'foreign_key' => true,
                            'references' => $sourceTable . '(ID)'
                        ];
                    }
                }
            }
        }

        return $tables;
    }




    /**
     * Generate VueFlow-compatible JSON from PDM.
     */
    private function generateVueFlowJSON(array $tables): array
    {
        $nodes = [];
        $edges = [];

        $x = 100;
        $y = 100;

        foreach ($tables as $table) {
            // Generowanie pól (fields) na podstawie kolumn tabeli
            $fields = [];
            foreach ($table['columns'] as $column) {
                $fields[] = [
                    'name' => $column['name'],
                    'type' => $column['type'],
                    'keyType' => $column['primary'] ? 'PK' : ($column['foreign_key'] ?? false ? 'FK' : '')
                ];

                // Dodaj krawędzie dla kluczy obcych
                if (isset($column['foreign_key']) && $column['foreign_key'] === true) {
                    $referencedTable = explode('(', $column['references'])[0]; // Pobierz nazwę tabeli
                    $edges[] = [
                        'id' => $table['name'] . '_to_' . $referencedTable,
                        'source' => $table['name'],
                        'target' => $referencedTable,
                        'label' => 'FK: ' . $column['name'] . ' → ' . $column['references'],
                        'type' => 'straight',
                    ];
                }
            }

            // Dodaj tabelę jako węzeł
            $nodes[] = [
                'id' => $table['name'],
                'type' => 'PDMNode',
                'position' => [
                    'x' => $x,
                    'y' => $y
                ],
                'data' => [
                    'label' => $table['name'],
                    'fields' => $fields
                ]
            ];

            $x += 300; // Adjust horizontal spacing for the next table
            $y += 200; // Adjust vertical spacing for each table
        }

        return ['nodes' => $nodes, 'edges' => $edges];
    }



}
