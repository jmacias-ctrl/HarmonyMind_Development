@extends('layouts.app')

@section('content')
<div class="container w-50 border p-4 mt-4">
    <h1>Usuarios</h1>
    <div>

        <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                @foreach ($users as $user)

                <th scope="row">{{ $user->id}}</th>
                <th>{{ $user->name}}</th>
                <th>{{ $user->email}}</th>
                <th>
                    <a class="btn btn-info" href="{{ route('users-edit', ['id'=> $user->id]) }}">Editar</a>
                    <form action="{{ route('users-destroy', [$user->id]) }}" method="POST">
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