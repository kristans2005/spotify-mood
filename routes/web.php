<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\SpotifyControllera;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/history', function () {
    return Inertia::render('History');
})->middleware(['auth', 'verified'])->name('history');

Route::get('/history', function () {
    return Inertia::render('History');
})->middleware(['auth', 'verified'])->name('history');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/spotify', [SpotifyControllera::class, 'index'])->name('spotify');
    Route::get('/spotify/token', [SpotifyControllera::class, 'getToken'])->name('spotify.token');
    Route::post('/spotify/latest', [SpotifyControllera::class, 'getLatestRelease'])->name('spotify.latest');
    Route::post('/spotify/mood', [SpotifyControllera::class, 'getMoodPlaylist'])->name('spotify.mood');
});

require __DIR__ . '/auth.php';
