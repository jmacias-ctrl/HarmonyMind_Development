@extends('layouts.app')

@section('content')
<div class="container w-25 border p-4 mt-4">
    <form action="{{route('users-update', ['id'=> $user->id])}}" method="POST">
        @method('PATCH')
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" name="name" class="form-control" value="{{$user->name}}">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" name="email" class="form-control" value="{{$user->email}}">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="text" name="password" class="form-control" value="{{$user->password}}">
      </div>
        <button type="submit" class="btn btn-primary">Editar</button>
    </form>
    
</div>

@endsection