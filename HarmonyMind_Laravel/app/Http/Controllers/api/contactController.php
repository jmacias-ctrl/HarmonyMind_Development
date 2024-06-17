<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Event;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\contact;
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
        $contacts = DB::table('contacts')
        ->select('contacts.*')
        ->where('user_fk', '=', Auth::user()->id)
        ->get();
        return response()->json(['success' => true, 'data'=>$user, 'data2'=>$contacts], 200);
        
    }

    /**
     * Actualizar información de contacto
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request){
        
        $rules = [
    
            'number' => 'required',
        ];
        $attribute = [
            'number' => 'Contacto de Emergencia',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            //$user = user::find(Auth::id());
            error_log($request->number);

            $contact = new contact;
                $contact->number= $request->number;
                $contact->user_fk= Auth::id();
            $contact->save();

            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
        
    }

    
    /**
     * Actualizar información de contacto
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request){

        $rules = [
    
            'id' => 'required',
        ];
        $attribute = [
            'id' => 'id del contacto',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            error_log($request->number);
            $contact = DB::table('contacts')
            ->where('user_fk', '=', Auth::user()->id)
            ->where('id', '=', $request->id)
            ->delete();
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }


   
}
