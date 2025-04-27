<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\KeuanganController;
use App\Http\Controllers\PenghuniController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Beranda', [
            'title' => 'Beranda',
            'description' => 'Selamat datang di aplikasi kami.',
        ]);
    })->name('home');

     // Route untuk keuangan
     Route::middleware('auth')->group(function () {
     Route::get('/keuangan', [KeuanganController::class, 'index'])->name('keuangan.index');
     Route::post('/keuangan', [KeuanganController::class, 'store'])->name('keuangan.store');
     Route::put('/keuangan/{keuangan}', [KeuanganController::class, 'update'])->name('keuangan.update');
     Route::delete('/keuangan/{keuangan}', [KeuanganController::class, 'destroy'])->name('keuangan.destroy');
    });
 
     // Route untuk kegiatan
     Route::prefix('kegiatan')->name('kegiatan.')->group(function () {
     Route::get('/', [KegiatanController::class, 'index'])->name('index');      // Tampilkan semua kegiatan
     Route::post('/', [KegiatanController::class, 'store'])->name('store');      // Simpan kegiatan baru
     Route::put('/{kegiatan}', [KegiatanController::class, 'update'])->name('update');  // Update kegiatan
     Route::delete('/{kegiatan}', [KegiatanController::class, 'destroy'])->name('destroy'); // Hapus kegiatan
});

 
     // Route untuk penghuni
     Route::prefix('penghuni')->name('penghuni.')->group(function () {
     Route::get('/', [PenghuniController::class, 'index'])->name('index');
     Route::post('/', [PenghuniController::class, 'store'])->name('store');
     Route::put('/{id}', [PenghuniController::class, 'update'])->name('update');
     Route::delete('/{id}', [PenghuniController::class, 'destroy'])->name('destroy');
    });
});

Route::middleware('guest')->group(function () {
    // Route default /login mengarah ke form login Admin
    Route::get('/login', [AuthController::class, 'showAdminLoginForm'])->name('login');

    // Route login khusus Admin
    Route::get('/login/admin', [AuthController::class, 'showAdminLoginForm'])->name('login.admin');
    Route::post('/login/admin', [AuthController::class, 'loginAdmin'])->name('login.admin.submit');

    // Route login khusus Penghuni
    Route::get('/login/penghuni', [AuthController::class, 'showPenghuniLoginForm'])->name('login.penghuni');
    Route::post('/login/penghuni', [AuthController::class, 'loginPenghuni'])->name('login.penghuni.submit');
});
// Route logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');