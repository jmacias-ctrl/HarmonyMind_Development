@extends('layouts.app')

@section('content')
<div class="container w-25 border p-4 mt-4">
    <h1>Editar Categoría</h1>
    <form action="{{route('events-update', ['id'=> $event->id])}}" method="POST">
        @method('PATCH')
        @csrf
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" name="nombre" class="form-control" value="{{$event->nombre}}">
        </div>

        <div class="mb-3">
            <label for="desc" class="form-label">Descripción</label>
            <input type="text" name="desc" class="form-control" value="{{$event->descripcion}}">
        </div>

        <div class="mb-3">
            <label for="fecha" class="form-label">Fecha</label>
            <input type="datetime-local" name="fecha" class="form-control" value="{{$event->fecha}}">
        </div>

        <div class="mb-3">
            <label for="org" class="form-label">Organizador</label>
            <input type="text" name="org" class="form-control" value="{{$event->organizador}}">
        </div>

        <div class="mb-3">
            <label for="tipo" class="form-label">Tipo</label>
            <input type="text" name="tipo" class="form-control" value="{{$event->tipo}}">
        </div>

        <div class="mb-3">
            <label for="categoria_fk" class="form-label">Categoría</label>
            <select class="form-select" name="categoria_fk" aria-label="Default select example">
                @foreach($categories as $category)
                <option value="{{$category->id}}">{{$category->nombre}}</option>
                @endforeach
              </select>
        </div>
        <button type="submit" class="btn btn-primary">Editar</button>
    </form>
    
</div>

@endsection