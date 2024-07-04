<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Learning;

class LearningController extends Controller
{
    public function index()
    {
        $learnings = Learning::with('categoriaLearning')
            ->join('categoria_learning', 'learning.categoria_learning_id', '=', 'categoria_learning.id')
            ->orderBy('categoria_learning.nombre_categoria')
            ->select('learning.*', 'categoria_learning.nombre_categoria as categoria_nombre')
            ->get();

        return response()->json($learnings);
    }

    public function show($id)
    {
        $learning = Learning::with('categoriaLearning')
            ->join('categoria_learning', 'learning.categoria_learning_id', '=', 'categoria_learning.id')
            ->where('learning.id', $id)
            ->select('learning.*', 'categoria_learning.nombre_categoria as categoria_nombre')
            ->first();

        if (!$learning) {
            return response()->json(['success' => false, 'message' => 'Learning not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $learning], 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'fecha_publicacion' => 'required|date',
            'categoria_learning_id' => 'required|exists:categoria_learnings,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $learning = new Learning();
        $learning->titulo = $request->titulo;
        $learning->descripcion = $request->descripcion;
        $learning->fecha_publicacion = $request->fecha_publicacion;
        $learning->categoria_learning_id = $request->categoria_learning_id;
        $learning->save();

        return response()->json(['success' => true, 'data' => $learning], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'string',
            'descripcion' => 'string',
            'fecha_publicacion' => 'date',
            'categoria_learning_id' => 'exists:categoria_learnings,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $learning = Learning::find($id);
        if (!$learning) {
            return response()->json(['success' => false, 'message' => 'Learning not found'], 404);
        }

        if ($request->has('titulo')) {
            $learning->titulo = $request->titulo;
        }
        if ($request->has('descripcion')) {
            $learning->descripcion = $request->descripcion;
        }
        if ($request->has('fecha_publicacion')) {
            $learning->fecha_publicacion = $request->fecha_publicacion;
        }
        if ($request->has('categoria_learning_id')) {
            $learning->categoria_learning_id = $request->categoria_learning_id;
        }

        $learning->save();

        return response()->json(['success' => true, 'data' => $learning], 200);
    }

    public function delete($id)
    {
        $learning = Learning::find($id);
        if (!$learning) {
            return response()->json(['success' => false, 'message' => 'Learning not found'], 404);
        }

        $learning->delete();

        return response()->json(['success' => true, 'message' => 'Learning deleted'], 200);
    }
}

