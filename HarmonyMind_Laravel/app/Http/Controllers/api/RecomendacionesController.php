<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\publicacion_estado;
use App\Models\Recomendaciones;
use Auth;
use Carbon\Carbon;

class RecomendacionesController extends Controller
{
    static public function analisis_ultimo_estado(){
        $publicacion = publicacion_estado::where('id_user', '=',Auth::user()->id)->orderByDesc('created_at')->first();
        $max_emocion = $publicacion->estado_de_animo;
        $value = $publicacion->$max_emocion;
        $recomendacion = Recomendaciones::where('emocion', $max_emocion)->where('nivel', '<=', $value)->select('recomendacion')->orderByDesc('nivel')->first();
        //return response()->json(['success'=>true, 'recomendacion'=>$recomendacion, 'value'=>$value, 'max_emocion'=>$max_emocion]);
        //return response()->json(['success'=>true]);
        if($recomendacion){
            return $recomendacion->recomendacion;
        }else{
            return "None";
        }
        
    }
}
