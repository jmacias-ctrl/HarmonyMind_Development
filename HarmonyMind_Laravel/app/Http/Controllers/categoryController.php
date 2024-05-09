<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class categoryController extends Controller
{
    public function index(){
        $categories = category::all();
        return view('categories', ['categories' => $categories]);
    }
    
    public function create()
    {
        return view('categories_create');
    }

    public function store(Request $request){
        $request->validate([
            'nombre' => 'required'
        ]);

        $category = new category;
        $category->nombre= $request->nombre;
        $category->save();

        return redirect()->route('categories')->with('success', 'Categoría creada correctamente');
    }

    public function destroy($id){
        $category = category::find($id);
        $category ->delete();
        return redirect()->route('categories')->with('success', 'Categoría eliminada');
    }

    public function show($id){
        $category = category::find($id);
        return view('categories_tab', ['category' => $category]);
    
    }

    public function update(Request $request, $id){
        $category = category::find($id);
        $category->nombre= $request->nombre;
        $category->save();
        return redirect()->route('categories')->with('success', 'Categoría actualizada');
    }
}
