<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Event;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Auth;   


class eventController extends Controller
{
    /**
     * Confirmar asistencia del usuario al evento
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function assign(Request $request)
    {  
        $rules = [
            'id_user' => 'required',
            'id_evento' => 'required',
        ];
        $attribute = [
            'id_user' => 'Id de usuario',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            DB::insert('insert into relations ( user_fk, event_fk) values ( ?, ?)', [$request->id_user, $request->id_evento]);
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
        
    }

     /**
     * Ver eventos disponibles al usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request){
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
            $relations = DB::table('relations')
                ->select('relations.event_fk')
                ->where('user_fk', '=', $request->id_user)
                ->get()->pluck('event_fk');
        
           
            //dd($relations);
            $events= DB::table('events')->join('categories', 'events.category_fk', '=', 'categories.id')
            ->select('events.*', 'categories.nombre AS categoria')->whereNotIn('events.id', $relations)->get();
            return response()->json(['success' => true, 'data'=>$events], 200);
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
        
    }
}
