<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Auth;   
use App\Models\Expert;
use App\Models\Appointment;
use Carbon\Carbon;

class ExpertController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAppointments()
    {
        $user = Auth::user();
        $appointments = DB::table('appointments')
        ->join('schedules', 'appointments.schedule_fk', '=', 'schedules.id')
        ->join('experts', 'schedules.expert_fk', '=', 'experts.id')
        ->select('appointments.*', 'experts.nombre AS nombre_experto', 'schedules.hora AS hora')
        ->where('user_fk', '=', Auth::user()->id)
        ->get();
        return response()->json(['success' => true, 'data'=>$appointments], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createAppointment(Request $request)
    {
        error_log("start");
        $rules = [
            
            'id_horario' => 'required',
        ];
        $attribute = [
            'id_horario' => 'Id de horario',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $expert = new appointment;
                $expert->schedule_fk = $request->id_horario;
                $expert->user_fk = Auth::user()->id;
                $expert->fecha = Carbon::now();
            $expert->save();

            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
