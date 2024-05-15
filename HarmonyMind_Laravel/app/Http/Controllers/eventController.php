<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class eventController extends Controller
{
    public function index(){
        $events = DB::table('events')
        ->join('categories', 'events.category_fk', '=', 'categories.id')
        ->select('events.*', 'categories.nombre AS categoria')
        ->get();
        return view('events', compact('events'));
    }
    
    public function create()
    {
        $categories = category::all();
        
        return view('events_create', ['categories' => $categories]);
    }

    public function store(Request $request){
        $request->validate([
            'nombre' => 'required',
            'desc' => 'required',
            'fecha' => 'required',
            'org' => 'required',
            'tipo' => 'required',
            'categoria_fk' => 'required'
        ]);

        $event = new event;
        $event->nombre= $request->nombre;
        $event->descripcion= $request->desc;
        $event->fecha= $request->fecha;
        $event->organizador= $request->org;
        $event->tipo= $request->tipo;
        $event->category_fk= $request->categoria_fk;
        $event->save();

        return redirect()->route('events')->with('success', 'Evento creado correctamente');
    }

    public function destroy($id){
        $event = event::find($id);
        $event ->delete();
        return redirect()->route('events')->with('success', 'Evento eliminado');
    }

    public function show($id){
        $event = event::find($id);
        $categories = category::all();
        return view('events_tab', ['event' => $event, 'categories' => $categories]);
    
    }

    public function update(Request $request, $id){
        $request->validate([
            'nombre' => 'required',
            'desc' => 'required',
            'fecha' => 'required',
            'org' => 'required',
            'tipo' => 'required',
            'categoria_fk' => 'required'
        ]);
        
        $event = event::find($id);
        $event->nombre= $request->nombre;
        $event->descripcion= $request->desc;
        $event->fecha= $request->fecha;
        $event->organizador= $request->org;
        $event->tipo= $request->tipo;
        $event->category_fk= $request->categoria_fk;
        $event->save();
        return redirect()->route('events')->with('success', 'Evento actualizado');
    }
}
