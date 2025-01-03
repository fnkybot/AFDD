<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\PDMController;
use App\Http\Controllers\SQLController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
*/

// Landing (Guest)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('welcome');

// Dashboard (Authenticated + Verified)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



// Dashboard - Profile (Authenticated)
Route::middleware('auth')->group(function () {
    Route::get('/app', [AppController::class, 'edit'])->name('app.edit');
    Route::get('/pdm', [PDMController::class, 'generatePDM'])->name('transform.to.physical'); // Strona do przekształcenia modelu
    Route::post('/api/upload-erd', [PDMController::class, 'uploadERD']);

    Route::get('/api/export-pdm', [PDMController::class, 'exportPDM'])->name('api.export.pdm'); // Eksport tabel jako JSON

    Route::get('/sql', [SQLController::class, 'edit'])->name('generate.sql.code'); // Strona generowania SQL
    Route::post('/api/convert-to-sql', [SQLController::class, 'convertToSQL'])->name('api.convert.to.sql'); // API do generowania SQL

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';

/*
|--------------------------------------------------------------------------
| Preview Pages Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/preview.php';
