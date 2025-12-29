<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// 서버는 HTML 화면을 주는 게 아니라, {'title':'hello'} 같은 데이터(JSON)만 던져 준다. 요리는 React가 한다.
// 데이터를 get
Route::get('/posts',[PostController::class, 'index']);

Route::post('/posts',[PostController::class,'store']);