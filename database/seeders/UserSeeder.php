<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin Asrama',
            'email' => 'admin@ekasari.test',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);
    
        User::create([
            'name' => 'Penghuni',
            'email' => 'penghuni@ekasari.test',
            'password' => Hash::make('penghuni123'),
            'role' => 'penghuni',
        ]);
    }
}
