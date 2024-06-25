<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\publicacion_estado;
use Auth;
use App\Http\Controllers\Api\RecomendacionesController;
use Carbon\Carbon;
class PublicacionEstadoController extends Controller
{
    /**
     * Crear publicación por el usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function inicio(){
        $username = Auth::user()->name;
        $date_now = Carbon::now()->toDateString();
        $countEstados = publicacion_estado::select(DB::raw('count(*) as count_estados'))->where('id_user', '=', Auth::user()->id)->whereDate('created_at', '=',$date_now)->first();
        return response()->json(["success"=>true, "username"=>$username, "countEstados"=>$countEstados]);
    }

    public function crear_publicacion(Request $request)
    {  
                $rules = [
            'publicacion' => 'required|string',
            'tristeza' => 'required',
            'felicidad' => 'required',
            'disgusto' => 'required',
            'ira' => 'required',
            'miedo' => 'required',
            'sorpresa' => 'required',
        ];
        $attribute = [
            'publicacion' => 'Publicacion',
            'tristeza' => 'Tristeza',
            'felicidad' => 'Felicidad',
            'disgusto' => 'Disgusto',
            'ira' => 'Ira',
            'miedo' => 'Miedo',
            'sorpresa' => 'Sorpresa',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            
            $publicacion = new publicacion_estado;
            $publicacion->id_user = Auth::user()->id;
            $publicacion->publicacion = $request->publicacion;
            $publicacion->tristeza = $request->tristeza;
            $publicacion->felicidad = $request->felicidad;
            $publicacion->disgusto = $request->disgusto;
            $publicacion->ira = $request->ira;
            $publicacion->miedo = $request->miedo;
            $publicacion->sorpresa = $request->sorpresa;
            
            $emociones = array(intval($request->tristeza)=>'tristeza' , intval($request->felicidad)=>'alegria', intval($request->disgusto)=>'disgusto', intval($request->ira)=>'ira', intval($request->miedo)=>'miedo', intval($request->sorpresa)=>'sorpresa');
            $publicacion->estado_de_animo = $emociones[max(array_keys($emociones))];
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
            $publicacion = publicacion_estado::find(Auth::user()->id);
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
        $date_yesterday = Carbon::today();
        $month_Str = array("en.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "agto.", "sept.", "oct.", "nov.", "dic.");
        $publicaciones = publicacion_estado::where('id_user', '=', Auth::user()->id)->orderByDesc('created_at')->get();
        $i=count($publicaciones);
        $emotions = array("felicidad"=>0, "tristeza"=>0, "miedo"=>0, "disgusto"=>0, "ira"=>0, "sorpresa"=>0);
        $count_total_emotions = 0;
        foreach ($publicaciones as &$publicacion) {
            Carbon::setLocale(LC_TIME, config('app.locale'));
            $date = Carbon::parse($publicacion->created_at);
            $publicacion->numero = $i;
            $publicacion->fecha = $date->toDayDateTimeString(); 
            $publicacion->dia = $date->day; 
            $publicacion->mes = $month_Str[$date->month-1]; 
            $publicacion->año = $date->year; 
            $publicacion->hora = $date->toTimeString();
            $i=$i-1;
            if($date->greaterThanOrEqualTo($date_yesterday)){
                $emotions[$publicacion->estado_de_animo]=$emotions[$publicacion->estado_de_animo]+1;
                $count_total_emotions+=1;
            }
        }
        $recomendacion = RecomendacionesController::analisis_ultimo_estado();
        return response()->json(['success' => true, 'data'=>$publicaciones, 'emociones'=>$emotions, 'count'=>$count_total_emotions, 'recomendacion'=>$recomendacion], 200);
    }
    
    public function analisis_estados(Request $request){
        $date_diff = Carbon::now()->subDays(intval($request->dias));
        $stats = publicacion_estado::select(DB::raw('sum(tristeza) as tristeza, sum(felicidad) as felicidad, sum(sorpresa) as sorpresa, sum(disgusto) as disgusto, sum(ira) as ira, sum(miedo) as miedo, created_at'))->where('id_user', '=', Auth::user()->id)->whereDate('created_at', '>',$date_diff)->groupBy('created_at')->orderBy('created_at', 'ASC')->get();
        $countEstados = publicacion_estado::select(DB::raw('count(*) as count_estados'))->where('id_user', '=', Auth::user()->id)->whereDate('created_at', '>',$date_diff)->first();
        return response()->json(['success' => true, 'data'=>$stats, 'countEstados'=>$countEstados]);
    }

    /**
     * Elminar publicacion del usuario
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function eliminar_publicacion(Request $request){
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
            return response()->json(['success' => true, 'data'=>$publicacion], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }
}
