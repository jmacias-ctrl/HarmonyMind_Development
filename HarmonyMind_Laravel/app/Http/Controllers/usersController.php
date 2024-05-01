<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

class usersController extends Controller
{
    public function index(){
        $users = user::all();
        foreach($users as $user){
            $events = DB::table('relations')
            ->join('events', 'relations.event_fk', '=', 'events.id')
            ->select('events.nombre')
            ->where('user_fk', '=', $user->id)
            ->get();

            //->value('nombre');

            $user->events = $events;
        }
        error_log($user->events);
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

    public function assign_event($id){
        $relations = DB::table('relations')
        ->select('relations.event_fk')
            ->where('user_fk', '=', $id)
            ->get()->pluck('event_fk');
        
           
            //dd($relations);
        $events= DB::table('events')->whereNotIn('id', $relations)->get();
        return view('user_events', ['id'=> $id, 'events' => $events]);
    
    }

    public function relation_store(Request $request){

        DB::insert('insert into relations ( user_fk, event_fk) values ( ?, ?)', [$request->user_fk, $request->evento_fk]);

        return redirect()->route('users')->with('success', 'Evento asociado al usuario correctamente');
    }

    public function remove_event($id){
        $events = DB::table('relations')
            ->join('events', 'relations.event_fk', '=', 'events.id')
            ->select('events.id', 'events.nombre')
            ->where('user_fk', '=', $id)
            ->get();
        return view('user_events_remove', ['id'=> $id, 'events' => $events]);
    
    }

    public function relation_remove($id, Request $request){
        $events = DB::table('relations')
            ->where('user_fk', '=', $request->user_fk)
            ->where('event_fk', '=', $request->evento_fk)
            ->delete();
            return redirect()->route('users')->with('success', 'Evento removido del usuario correctamente');
    }
}
