<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showAdminLoginForm()
    {
        return Inertia::render('Auth/Login', ['role' => 'admin']);
    }

    public function loginAdmin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->intended('/');
        }
        return back()->withErrors(['email' => 'Email atau password salah.']);
    }

    public function showPenghuniLoginForm()
    {
        return Inertia::render('Auth/Login', ['role' => 'penghuni']);
    }

    public function loginPenghuni(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->intended('/');
        }
        return back()->withErrors(['email' => 'Email atau password salah.']);
    }

    // Logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
