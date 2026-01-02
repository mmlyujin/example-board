<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/posts',[PostController::class,'store']);

// 게시물 리스트 가져오기
Route::get('/posts',[PostController::class, 'index']);

// 게시물 삭제하기(ID 기반)
Route::delete('/posts/{id}',[PostController::class,'destroy']);