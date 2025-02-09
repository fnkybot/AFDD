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
     *
     * @param Request $reguest
     * @return Response
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
        return strtoupper(str_replace(' ', '_', $name));
    }

    /**
     * Handle the upload of an Entity-Relationship Diagram (ERD).
     *
     * @param Request $request
     * @return Response
     */
    public function uploadERD(Request $request)
    {
        $erdData = null;

        if ($request->hasFile('erdFile')) {
            $request->validate([
                'erdFile' => 'required|file|mimes:json',
            ]);

            $path = $request->file('erdFile')->store('temp');

            $erdData = json_decode(Storage::get($path), true);

            Storage::delete($path);

            if (!$erdData) {
                return response()->json(['error' => 'Invalid JSON format in uploaded file.'], 400);
            }
        } else {
            return response()->json(['error' => 'No valid ERD data provided.'], 400);
        }

        $pdmData = $this->buildPDM($erdData);

        $vueFlowData = $this->generateVueFlowJSON($pdmData);

        return response()->json([
            'vueFlowData' => $vueFlowData,
            'pdmData' => $pdmData,
        ], 200);
    }

    /**
     * Build Physical Data Model (PDM) from project data containing nodes and edges.
     *
     * @param array $projectData
     * @return array
     */
    private function buildPDM(array $projectData)
    {
        $nodes = $projectData['nodes'];
        $edges = $projectData['edges'];
        $tables = [];

        // tables to entities
        foreach ($nodes as $node) {
            if ($node['type'] === 'entityType') {
                $tableName = $this->normalizeName($node['data']['label']);
                $tables[$tableName] = [
                    'name' => $tableName,
                    'columns' => []
                ];
            }
        }

        // atributes to tables
        foreach ($nodes as $node) {
            if ($node['type'] === 'attributeType') {

                \Log::info('Processing node:', $node);

                $attributeName = $this->normalizeName($node['data']['label']);
                $attribute = [
                    'name' => $attributeName,
                    'type' => $node['data']['nodeType'],
                    'primary' => $node['data']['isPrimaryKey'] ?? false
                ];

                \Log::info('Processing attribute:', $attribute);

                // search table with attribute
                foreach ($edges as $edge) {

                    \Log::info('Processing edge:', $edge);

                    if ($edge['target'] === $node['id'] || $edge['source'] === $node['id']) {
                        $relatedNodeId = $edge['target'] === $node['id'] ? $edge['source'] : $edge['target'];
                        $relatedNode = collect($nodes)->firstWhere('id', $relatedNodeId);

                        if ($relatedNode && $relatedNode['type'] === 'entityType') {
                            $tableName = $this->normalizeName($relatedNode['data']['label']);

                            // check if exist
                            if (!isset($tables[$tableName])) {
                                $tables[$tableName] = ['name' => $tableName, 'columns' => []];
                            }

                            // add attribute to table column
                            if ($attribute['primary']) array_unshift($tables[$tableName]['columns'], $attribute);
                            else $tables[$tableName]['columns'][] = $attribute;

                        }
                    }
                }
            }
        }

        // tables for complex relationship and foregein keys
        foreach ($nodes as $node) {
            if ($node['type'] === 'relationshipType') {
                $relationshipName = $this->normalizeName($node['data']['label']);

                // Search entities connected on relationship
                $connectedEntities = [];
                foreach ($edges as $edge) {
                    if ($edge['source'] === $node['id'] || $edge['target'] === $node['id']) {
                        $relatedNode = collect($nodes)->firstWhere('id', $edge['source'] === $node['id'] ? $edge['target'] : $edge['source']);
                        if ($relatedNode && $relatedNode['type'] === 'entityType') {
                            $connectedEntities[] = $this->normalizeName($relatedNode['data']['label']);
                        }
                    }
                }

                // If relationship ship 2 entities
                if (count($connectedEntities) === 2) {
                    $entityA = $connectedEntities[0];
                    $entityB = $connectedEntities[1];

                    // Add foregein keys on M:M relationshop
                    $tables[$relationshipName] = [
                        'name' => $relationshipName,
                        'columns' => [
                            [
                                'name' => $entityA . '_id',
                                'type' => 'INT',
                                'primary' => false,
                                'foreign_key' => true,
                                'references' => $entityA . '(id)'
                            ],
                            [
                                'name' => $entityB . '_id',
                                'type' => 'INT',
                                'primary' => false,
                                'foreign_key' => true,
                                'references' => $entityB . '(id)'
                            ]
                        ]
                    ];
                }
            }
        }

        // Add foregein keys on 1:1 relationship
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
                            'type' => 'INT',
                            'primary' => false,
                            'foreign_key' => true,
                            'references' => $sourceTable . '(ID)'
                        ];
                    }
                }
            }
        }

        foreach ($tables as $tableName => $table) {
            $primaryKeys = array_filter($table['columns'], function ($column) {
                return $column['primary'] ?? false;
            });

            if (count($primaryKeys) > 1) return 0;

            $columnNames = array_column($table['columns'], 'name');
            if (count($columnNames) !== count(array_unique($columnNames))) return 0;
        }

        return $tables;
    }

    /**
     * Generate VueFlow-compatible JSON from Physical Data Model (PDM) tables.
     *
     * @param array $tables
     * @return array
     */
    private function generateVueFlowJSON(array $tables): array
    {
        $nodes = [];
        $edges = [];

        $x = 100;
        $y = 100;

        foreach ($tables as $table) {
            // Generate fields based on table columns
            $fields = [];
            foreach ($table['columns'] as $column) {
                $fields[] = [
                    'name' => $column['name'],
                    'type' => $column['type'],
                    'keyType' => $column['primary'] ? 'PK' : ($column['foreign_key'] ?? false ? 'FK' : '')
                ];

                // Add edges for foregin keys
                if (isset($column['foreign_key']) && $column['foreign_key'] === true) {
                    $referencedTable = explode('(', $column['references'])[0]; // Get table name
                    $edges[] = [
                        'id' => $table['name'] . '_to_' . $referencedTable,
                        'source' => $table['name'],
                        'target' => $referencedTable,
                        'label' => 'FK: ' . $column['name'] . ' → ' . $column['references'],
                        'type' => 'straight',
                    ];
                }
            }

            // Add table as nod
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
