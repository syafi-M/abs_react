<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\Absensi;
use App\Models\Jabatan;
use App\Models\JadwalUser;
use App\Models\Kerjasama;
use App\Models\Lembur;
use App\Models\Lokasi;
use App\Models\Point;
use App\Models\Rating;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $abs = Absensi::all();
        $lembur = Lembur::latest('jam_selesai')->get();
        $kerjasama = Kerjasama::all();
        $absen = Absensi::all();
        $rate = Rating::all();
        $user = Auth::user()->divisi->jabatan_id;
        $nguser = new UserCollection( User::with(['Divisi', 'Kerjasama', 'Role'])->where('id', Auth::user()->id)->get());
        $jabatan = Jabatan::where('id', $user)->get();
        $point = Point::all();
        $shift = Shift::all();
        $jadwalUser = JadwalUser::all();
        $harLok = Lokasi::where('client_id', Auth::user()->kerjasama->client_id)->first();
        return Inertia::render('Dashboard', [
            'absen' => $absen,
            'abs' => $abs,
            'lembur' => $lembur,
            'kerjasama' => $kerjasama,
            'rate' => $rate,
            'user' => $user,
            'point' => $point,
            'harLok' => $harLok,
            'shift' => $shift,
            'jadwalUser' => $jadwalUser,
            'nguser' => $nguser,
            'jabatan' => $jabatan,
        ]);
    }
}
