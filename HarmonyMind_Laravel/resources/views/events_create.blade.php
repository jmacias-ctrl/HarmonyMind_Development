@extends('layouts.app')

@section('content')
<div class="container w-25 border p-4 mt-4">
    <h1>Crear Categoría</h1>
    <form action="{{route('events-store')}}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" name="nombre" class="form-control">
        </div>

        <div class="mb-3">
            <label for="desc" class="form-label">Descripción</label>
            <input type="text" name="desc" class="form-control">
        </div>

        <div class="mb-3">
            <label for="fecha" class="form-label">Fecha</label>
            <input type="datetime-local" name="fecha" class="form-control">
        </div>

        <div class="mb-3">
            <label for="org" class="form-label">Organizador</label>
            <input type="text" name="org" class="form-control">
        </div>

        <div class="mb-3">
            <label for="tipo" class="form-label">Tipo</label>
            <input type="text" name="tipo" class="form-control">
        </div>

        <div class="mb-3">
            <label for="categoria_fk" class="form-label">Categoría</label>
            <select class="form-select" name="categoria_fk" aria-label="Default select example">
                @foreach($categories as $category)
                <option value="{{$category->id}}">{{$category->nombre}}</option>
                @endforeach
              </select>
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
    </form>
    
</div>

@endsection