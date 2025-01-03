<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SQLController extends Controller
{
    /**
     * Render the SQL generation page.
     */
    public function edit(Request $request)
    {
        return inertia('app/GenerateSQL', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Convert PDM tables to SQL code.
     *
     * @param array $tables
     * @return string
     */
    private function generateSQL(array $tables): string
    {
        $sqlStatements = [];

        foreach ($tables as $table) {
            // Start creating the CREATE TABLE statement
            $sql = "CREATE TABLE {$table['name']} (\n";

            $columns = [];
            $primaryKeys = [];

            foreach ($table['columns'] as $column) {
                $colDef = "{$column['name']} {$column['type']}";
                if ($column['primary'] ?? false) {
                    $primaryKeys[] = $column['name'];
                }
                if (!empty($column['foreign_key'])) {
                    $colDef .= " REFERENCES {$column['references']}";
                }
                $columns[] = $colDef;
            }

            // Add primary key constraint if available
            if (!empty($primaryKeys)) {
                $columns[] = "PRIMARY KEY (" . implode(", ", $primaryKeys) . ")";
            }

            $sql .= implode(",\n", $columns) . "\n);";
            $sqlStatements[] = $sql;
        }

        return implode("\n\n", $sqlStatements);
    }

    /**
     * API endpoint to convert PDM to SQL.
     */
    public function convertToSQL(Request $request)
    {
        $request->validate([
            '*' => 'array', // Walidacja dla dowolnej struktury
        ]);

        $rawTables = $request->all();

        try {
            $tables = [];
            foreach ($rawTables as $key => $tableData) {
                if (!isset($tableData['name']) || !isset($tableData['columns'])) {
                    throw new \Exception("Invalid table format for key: $key");
                }
                $tables[] = $tableData;
            }

            $sqlCode = $this->generateSQL($tables);
            return response()->json(['sql' => $sqlCode], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate SQL: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    }


}
