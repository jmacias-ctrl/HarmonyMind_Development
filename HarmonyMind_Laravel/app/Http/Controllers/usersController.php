<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class usersController extends Controller
{
    public function index(){
        $users = user::all();
        return view('users', ['users' => $users]);
    }

    public function destroy($id){
        $user = user::find($id);
        $user ->delete();
        return redirect()->route('users')->with('success', 'Usuario eliminado');
    }

    public function show($id){
        $user = user::find($id);
        return view('users_tab', ['user' => $user]);
    
    }

    public function update(Request $request, $id){
        $user = user::find($id);
        $user->name= $request->name;
        $user->email= $request->email;
        $user->password= $request->password;
        $user->save();
        return redirect()->route('users')->with('success', 'Usuario actualizado');
    }
}
