<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $fillable = [
        'judul',
        'deskripsi',
        'tanggal',
        'waktu_mulai',
        'waktu_selesai',
        'status',
        'notulensi',
        'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];
}
