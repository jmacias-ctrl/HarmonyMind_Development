<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Event;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Auth;   


class contactController extends Controller
{
    /**
     * Obtener información de contacto
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request){
        
        $user = Auth::user();
        return response()->json(['success' => true, 'data'=>$user], 200);
        
    }

    /**
     * Actualizar información de contacto
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request){
        
        $rules = [
    
            'contact' => 'required',
        ];
        $attribute = [
            'contact' => 'Contacto de Emergencia',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $user = user::find(Auth::id());
                $user->emergency_contact = $request->contact;
            $user->save();
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
        
    }


   
}
