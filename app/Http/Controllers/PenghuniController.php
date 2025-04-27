<?php

namespace App\Http\Controllers;

use App\Models\Penghuni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenghuniController extends Controller
{
    public function index()
    {
        return Inertia::render('Penghuni', [
            'penghunis' => Penghuni::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'tanggalLahir' => 'required|date',
            'prodi' => 'required|string',
            'angkatan' => 'required|integer',
            'asalDaerah' => 'required|string',
            'noHp' => 'required|string',
        ]);
        
        Penghuni::create($request->all());

        return redirect()->route('penghuni.index');
    }

    public function update(Request $request, $id)
    {
        $penghuni = Penghuni::findOrFail($id);
        $penghuni->update($request->all());

        return redirect()->route('penghuni.index');
    }

    public function destroy($id)
    {
        Penghuni::destroy($id);

        return redirect()->route('penghuni.index');
    }
}
