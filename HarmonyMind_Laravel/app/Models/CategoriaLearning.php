<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaLearning extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_categoria',
    ];

    public function learnings()
    {
        return $this->hasMany(Learning::class);
    }
}
