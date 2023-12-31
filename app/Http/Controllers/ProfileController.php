<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

     public function index()
    {
        return Inertia::render('Profile/Index');
    }
    public function edit(Request $request, $id): Response
    {
        $user = User::find($id);
        $dataUser = User::findOrFail($id);
        if ($dataUser != null) {
            return Inertia::render('Profile/Edit', [
                "dataUser" => $dataUser
            ]);
        }
        toastr()->error('Data tidak tidak ditemukan', 'error');
        return redirect()->back();
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        $user = [
            'nama_lengkap' => $request->nama_lengkap,
            'email'     => $request->email,
            'image'     => $request->image,
        ];

        if($request->hasFile('image'))
        {
            if($request->oldimage)
            {
                Storage::disk('public')->delete('images/' . $request->oldimage);
            }

            $user['image'] = UploadImage($request, 'image');
        }else{
            $user['image'] = $request->oldimage;
        }
        try {
            User::findOrFail($id)->update($user);
        } catch(\Illuminate\Database\QueryException $e){
           toastr()->error('Data Sudah Ada', 'error');
           return redirect()->back();
        }
    
        toastr()->success('Data Berhasil diupdate', 'success');
        return Redirect::route('profile.edit');

    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'], 
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
