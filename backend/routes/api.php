<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;

Route::apiResource('projects', ProjectController::class);
Route::post('/contact', [ContactController::class, 'store']);