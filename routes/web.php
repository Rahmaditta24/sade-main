<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Beranda', [
            'title' => 'Beranda',
            'description' => 'Selamat datang di aplikasi kami.',
        ]);
    })->name('home');

    Route::get('/keuangan', function () {
        return Inertia::render('keuangan', [
            'title' => 'Keuangan',
            'description' => 'Kelola keuangan Anda dengan mudah dan efisien.',
        ]);
    })->name('keuangan');

    Route::get('/kegiatan', function () {
        return Inertia::render('kegiatan', [
            'title' => 'Kegiatan',
            'description' => 'Ikuti berbagai kegiatan menarik yang kami adakan.',
        ]);
    })->name('kegiatan');

    Route::get('/penghuni', function () {
        return Inertia::render('penghuni', [
            'title' => 'Penghuni',
            'description' => 'Kelola data penghuni dengan mudah.',
        ]);
    })->name('penghuni');
});

Route::middleware('guest')->group(function () {
    // Rute default /login mengarah ke form login Admin
    Route::get('/login', [AuthController::class, 'showAdminLoginForm'])->name('login');

    // Rute login khusus Admin
    Route::get('/login/admin', [AuthController::class, 'showAdminLoginForm'])->name('login.admin');
    Route::post('/login/admin', [AuthController::class, 'loginAdmin'])->name('login.admin.submit');

    // Rute login khusus Penghuni
    Route::get('/login/penghuni', [AuthController::class, 'showPenghuniLoginForm'])->name('login.penghuni');
    Route::post('/login/penghuni', [AuthController::class, 'loginPenghuni'])->name('login.penghuni.submit');
});
// Rute logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');