<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Learning extends Model
{
    use HasFactory;

    protected $table = 'learning'; 

    protected $fillable = [
        'titulo',
        'descripcion',
        'fecha_publicacion',
        'categoria_learning_id',
    ];

    public function categoriaLearning()
    {
        return $this->belongsTo(CategoriaLearning::class);
    }
}
