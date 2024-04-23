@extends('layouts.app')

@section('content')
<div class="container w-25 border p-4 mt-4">
    <h1>Editar Categoría</h1>
    <form action="{{route('categories-update', ['id'=> $category->id])}}" method="POST">
        @method('PATCH')
        @csrf
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" name="nombre" class="form-control" value="{{$category->nombre}}">
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
    </form>
    
</div>

@endsection