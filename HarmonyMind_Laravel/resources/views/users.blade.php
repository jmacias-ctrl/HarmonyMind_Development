@extends('layouts.app')

@section('content')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>


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
                    <button id="eventsButton" type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#eventsModal" data-events-list="{{json_encode($user->events)}}">
                      Ver eventos
                  </button>
                  <a class="btn btn-info" href="{{ route('users-assign-event', ['id'=> $user->id]) }}">Asignar evento</a>
                  <a class="btn btn-info" href="{{ route('users-remove-event', ['id'=> $user->id]) }}">Remover evento</a>
                </th>
                <tr>
    
                @endforeach

              </tr>
              
            </tbody>
          </table>
          <div class="modal fade" id="eventsModal" tabindex="-1" role="dialog" aria-labelledby="eventsModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="eventsModalLabel">Eventos</h5>
                    </div>
                    <div class="modal-body">
                        <p class="text-center" id="eventsList"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-outline-danger" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script>
  $(document).on('show.bs.modal', '#eventsModal', function(event) {
    const button = $(event.relatedTarget); // Button que triggerea el modal
    const events = button.data('events-list');

    console.log("events");

    console.log(events);
    var p = document.getElementById("eventsList");
    p.setAttribute('style', 'white-space: pre;');
    p.textContent = "";

    var index= 1;

    events.forEach(function(entry) {
      console.log(entry.name);
      name = entry.nombre;
      p.textContent +=  name + "\r\n";
      index++;
    });
    
    });
</script>