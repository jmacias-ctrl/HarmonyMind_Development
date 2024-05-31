@extends('layouts.app')

@section('content')
<div class="container w-25 border p-4 mt-4">
    <h1>Asignar Evento</h1>
    <form action="{{route('relations-store')}}" method="POST">
        @csrf
        <div class="mb-3">
            <input type="hidden" name="user_fk" value="{{$id}}" />
            <label for="evento_fk" class="form-label">Evento</label>
            <select class="form-select" name="evento_fk" aria-label="Default select example">
                @foreach($events as $event)
                <option value="{{$event->id}}">{{ $event->nombre}}</option>
                @endforeach
              </select>
        </div>
        <button type="submit" class="btn btn-primary">Asignar</button>
    </form>
    
</div>

@endsection