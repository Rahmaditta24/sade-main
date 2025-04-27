<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KegiatanController extends Controller
{
    public function index()
{
    return Inertia::render('Kegiatan', [
        'kegiatans' => Kegiatan::all(),
    ]);
}

    public function create()
    {
        return Inertia::render('Kegiatan/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'waktu_mulai' => 'required',
            'waktu_selesai' => 'required',
            'status' => 'required|in:akan_datang,berlangsung,selesai,arsip',
            'keterangan' => 'nullable|string|max:255',
            'notulensi' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        if ($request->hasFile('notulensi')) {
            $validated['notulensi'] = $request->file('notulensi')->store('notulensi');
        }

        Kegiatan::create($validated);

        return redirect()->route('kegiatan')->with('success', 'Kegiatan berhasil ditambahkan.');
    }

    public function show($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);

        return Inertia::render('Kegiatan/Detail', [
            'kegiatan' => $kegiatan,
        ]);
    }

    public function update(Request $request, $id)
    {
        $kegiatan = Kegiatan::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'waktu_mulai' => 'required',
            'waktu_selesai' => 'required',
            'status' => 'required|in:akan_datang,berlangsung,selesai,arsip',
            'keterangan' => 'nullable|string|max:255',
            'notulensi' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        if ($request->hasFile('notulensi')) {
            // Hapus file lama kalau ada
            if ($kegiatan->notulensi) {
                Storage::delete($kegiatan->notulensi);
            }
            $validated['notulensi'] = $request->file('notulensi')->store('notulensi');
        }

        $kegiatan->update($validated);

        return redirect()->route('kegiatan')->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);

        if ($kegiatan->notulensi) {
            Storage::delete($kegiatan->notulensi);
        }

        $kegiatan->delete();

        return redirect()->route('kegiatan')->with('success', 'Kegiatan berhasil dihapus.');
    }
}
