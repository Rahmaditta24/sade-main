<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penghuni extends Model
{
    use HasFactory;

    protected $table = 'penghunis';

    protected $fillable = [
        'nama',
        'tanggalLahir',
        'prodi',
        'angkatan',
        'asalDaerah',
        'noHp',
    ];

    public $timestamps = true;
}
