<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;

Route::get('/', [MainController::class, 'index']);

Route::post('/submit', [MainController::class, 'submit']);
