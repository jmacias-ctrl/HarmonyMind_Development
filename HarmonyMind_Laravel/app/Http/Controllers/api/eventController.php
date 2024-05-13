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
            
            'id_evento' => 'required',
        ];
        $attribute = [
            'id_evento' => 'Id de evento',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            DB::insert('insert into relations ( user_fk, event_fk) values ( ?, ?)', [Auth::user()->id, $request->id_evento]);
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }


     /**
     * Ver eventos disponibles al usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request){
        
        $relations = DB::table('relations')
            ->select('relations.event_fk')
            ->where('user_fk', '=', Auth::user()->id)
            ->get()->pluck('event_fk');
        
           
            //dd($relations);
        $events= DB::table('events')->join('categories', 'events.category_fk', '=', 'categories.id')
        ->select('events.*', 'categories.nombre AS categoria')->whereNotIn('events.id', $relations)->get();
        return response()->json(['success' => true, 'data'=>$events], 200);
        
    }

    /**
     * Ver eventos registrados del usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index_assist(Request $request){
        
        $events = DB::table('relations')
        ->join('events', 'relations.event_fk', '=', 'events.id')
        ->join('categories', 'events.category_fk', '=', 'categories.id')
        ->select('events.*', 'categories.nombre AS categoria')
        ->where('user_fk', '=', Auth::user()->id)
        ->get();
        return response()->json(['success' => true, 'data'=>$events], 200);
        
    }

    /**
     * Remover asistencia del usuario al evento
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function relation_remove(Request $request)
    {  
        $rules = [
    
            'id_evento' => 'required',
        ];
        $attribute = [
            'id_evento' => 'Id de evento',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $relation = DB::table('relations')
            ->where('user_fk', '=', Auth::user()->id)
            ->where('event_fk', '=', $request->id_evento)
            ->delete();
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }
}
