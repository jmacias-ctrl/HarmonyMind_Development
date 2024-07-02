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
            $appointment = new appointment;
                $appointment->schedule_fk = $request->id_horario;
                $appointment->user_fk = Auth::user()->id;
                $appointment->fecha = Carbon::now();
            $appointment->save();

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
    public function showSchedule(Request $request)
    {
        $rules = [
            
            'expert_id' => 'required',
        ];
        $attribute = [
            'expert_id' => 'Id de experto',
        ];
        $message = [
            'required' => ':attribute es obligatorio'
        ];
        $validator = Validator::make($request->all(), $rules, $message, $attribute);
        if ($validator->passes()) {
            $expert = expert::find($request->expert_id);
            $schedules = DB::table('schedules')
            ->select('schedules.*')
            ->where('expert_fk', '=', $expert->id)
            ->get();

            foreach($schedules as $schedule){
                $appointments = DB::table('appointments')
                ->select('appointments.schedule_fk')
                ->where('schedule_fk', '=', $schedule->id)
                ->where('fecha', '=', Carbon::now()->toDateString())
                ->first();
                if($appointments == null){
                    $schedule->ocupado= false;
                }else{
                    $schedule->ocupado= true;
                }
                
            }

            return response()->json(['success' => true, 'data'=>$schedules], 200);
        }
        return response()->json(['success' => false, 'validator'=>$validator->errors()], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showExperts()
    {
        $experts = expert::all();
        

        foreach($experts as $expert){
            $schedules = DB::table('schedules')
            ->select('schedules.id')
            ->where('expert_fk', '=', $expert->id)
            ->get()->pluck('id');

            $appointments = DB::table('appointments')
            ->select('appointments.schedule_fk')
            ->whereIn('schedule_fk', $schedules)
            ->where('fecha', '=', Carbon::now()->toDateString())
            ->get();

            error_log($appointments->count());
            error_log($schedules->count());
            if($appointments->count() == $schedules->count()){
                $expert->ocupado= true;
            }else{
                $expert->ocupado= false;
            }
                
        }

        
        return response()->json(['success' => true, 'data'=>$experts], 200);
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
