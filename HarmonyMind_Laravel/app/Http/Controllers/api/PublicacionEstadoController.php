<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\publicacion_estado;
use Auth;   
class PublicacionEstadoController extends Controller
{
    /**
     * Crear publicación por el usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function crear_publicacion(Request $request)
    {  
        $rules = [
            'publicacion' => 'required|string',
            'estado_de_animo' => 'required',
        ];
        $attribute = [
            'publicacion' => 'Publicacion',
            'estado_de_animo' => 'Estado de Animo',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $publicacion = new publicacion_estado;
            $publicacion->id_user = Auth::user()->id;
            $publicacion->publicacion = $request->publicacion;
            $publicacion->estado_de_animo = $request->estado_de_animo;
            $publicacion->save();
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }


    /**
     * Modificar una publicacion del usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function modificar_publicacion(Request $request)
    {  
        $rules = [
            'id_user' => 'required',
            'publicacion' => 'required|string',
            'estado_de_animo' => 'required',
        ];
        $attribute = [
            'id_user' => 'Usuario',
            'publicacion' => 'Publicacion',
            'estado_de_animo' => 'Estado de Animo',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $publicacion = publicacion_estado::find($request->id_publicacion);
            $publicacion->publicacion = $request->publicacion;
            $publicacion->estado_de_animo = $request->estado_de_animo;
            $publicacion->save();
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }

     /**
     * Ver publicaciones del usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function ver_publicaciones(Request $request){
        $rules = [
            'id_user' => 'required',
        ];
        $attribute = [
            'id_publicacion' => 'Publicación',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $publicaciones = publicacion_estado::where('id_user', '=', Auth::user()->id)->orderByDesc('created_at')->get();
            return response()->json(['success' => true, 'data'=>$publicaciones], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }

    /**
     * Elminar publicacion del usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function eliminar_publicaciones(Request $request){
        $rules = [
            'id_publicacion' => 'required',
        ];
        $attribute = [
            'id_publicacion' => 'Publicación',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $publicacion = publicacion_estado::find($request->id_publicacion)->delete();
            return response()->json(['success' => true, 'data'=>$publicaciones], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }
}
