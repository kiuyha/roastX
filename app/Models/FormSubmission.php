<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    protected $table = 'form_submissions';

    protected $fillable = [
        'ip_address',
    ];
}
