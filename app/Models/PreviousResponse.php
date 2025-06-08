<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreviousResponse extends Model
{
    protected $table = 'previous_responses';

    protected $fillable = [
        'username',
        'data',
        'response',
    ];

    protected $casts = [
        'data' => 'array',
        'response' => 'array',
    ];
}
