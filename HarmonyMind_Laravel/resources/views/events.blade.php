@extends('layouts.app')

@section('content')
<div class="container w-50 border p-4 mt-4">
    <h1>Eventos</h1>
    <a href="{{ route('events-create') }}" class="btn btn-sm btn-outline-success mb-2">Crear</a>
    <div>

        <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Fecha</th>
                <th scope="col">Organizador</th>
                <th scope="col">Tipo</th>
                <th scope="col">Categoría</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                @foreach ($events as $event)

                <th scope="row">{{ $event->id}}</th>
                <th>{{ $event->nombre}}</th>
                <th>{{ $event->descripcion}}</th>
                <th>{{ $event->fecha}}</th>
                <th>{{ $event->organizador}}</th>
                <th>{{ $event->tipo}}</th>
                <th>{{ $event->categoria}}</th>
                <th>
                    <a class="btn btn-info" href="{{ route('events-edit', ['id'=> $event->id]) }}">Editar</a>
                    <form action="{{ route('events-destroy', [$event->id]) }}" method="POST">
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