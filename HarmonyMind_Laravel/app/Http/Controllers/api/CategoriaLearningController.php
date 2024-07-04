<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\CategoriaLearning;

class CategoriaLearningController extends Controller
{
    public function index()
    {
        $categories = CategoriaLearning::all();
        return response()->json($categories);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $category = new CategoriaLearning();
        $category->name = $request->name;
        $category->save();

        return response()->json(['success' => true, 'data' => $category], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $category = CategoriaLearning::find($id);
        if (!$category) {
            return response()->json(['success' => false, 'message' => 'Category not found'], 404);
        }

        if ($request->has('name')) {
            $category->name = $request->name;
        }

        $category->save();

        return response()->json(['success' => true, 'data' => $category], 200);
    }

    public function delete($id)
    {
        $category = CategoriaLearning::find($id);
        if (!$category) {
            return response()->json(['success' => false, 'message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['success' => true, 'message' => 'Category deleted'], 200);
    }
}
