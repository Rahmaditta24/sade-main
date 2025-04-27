<?php

namespace App\Http\Controllers;

use App\Models\Keuangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeuanganController extends Controller
{
    // Menampilkan daftar keuangan
    public function index()
    {
        $keuangans = Keuangan::orderBy('tanggal', 'asc')->get();

        return Inertia::render('Keuangan', [
            'keuangans' => $keuangans
        ]);
    }

    // Menyimpan data keuangan baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'jumlah' => 'required|integer',
            'deskripsi' => 'required|string',
            'tipe' => 'required|in:masuk,keluar',
        ]);

        Keuangan::create($validated);

        return back(); // langsung reload di frontend
    }

      // Menampilkan halaman edit
    public function update(Request $request, Keuangan $keuangan)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'jumlah' => 'required|integer',
            'deskripsi' => 'required|string',
            'tipe' => 'required|in:masuk,keluar',
        ]);

        $keuangan->update($validated);

        return back();
    }

      // fungsi hapus keuangan

    public function destroy(Keuangan $keuangan)
    {
        $keuangan->delete();

        return back();
    }
}
