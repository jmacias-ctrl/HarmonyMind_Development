@extends('layouts.app')

@section('content')
<div class="container w-50 border p-4 mt-4">
    <h1>Categorías</h1>
    <a href="{{ route('categories-create') }}" class="btn btn-sm btn-outline-success mb-2">Crear</a>
    <div>

        <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                @foreach ($categories as $category)

                <th scope="row">{{ $category->id}}</th>
                <th>{{ $category->nombre}}</th>
                <th>
                    <a class="btn btn-info" href="{{ route('categories-edit', ['id'=> $category->id]) }}">Editar</a>
                    <form action="{{ route('categories-destroy', [$category->id]) }}" method="POST">
                        @method('DELETE')
                        @csrf
                        <button class="btn btn-danger btn-sm">Eliminar</button>
                    </form>
                </th>
                <tr>
    
                @endforeach

              </tr>
              
            </tbody>
          </table>
        
    </div>
</div>
@endsection