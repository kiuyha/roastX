<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;

Route::get('/', [MainController::class, 'detectLanguage']);

Route::get('/proxy-image', [MainController::class, 'getImage']);

Route::get('/people-roasted', [MainController::class, 'getPeopleRoasted']);

Route::get('/{lang}', [MainController::class, 'mainPage'])->name('main');

Route::post('/{lang}/fetch-data', [MainController::class, 'fetchData']);

