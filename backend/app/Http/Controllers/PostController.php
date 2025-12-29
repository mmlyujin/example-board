<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // 목록 보기
    // 함수에는 리턴 값이 존재해야 한다. 함수의 결과물
    public function index()
    {
        return Post::all(); // 검증을 끝내고 저장된 모든 글을 JSON 형태로 리턴
    }

    // 저장하기
    // 외부에서 요청이 들어오면, 손님이 보낸 데이터($request)를 들고 저장(store) 업무를 시작하는 공개된 작업장이다.
    // Request $request -> 손님이 보낸 데이터가 담긴 봉투. 열어서 내용을 확인하고 DB에 담게 된다.
    public function store(Request $request)
    {
        // 프론트에서 보낸 데이터를 유효성 검사한다.
        // 게시물을 저장하기 전에 validate로 유효성 검사를 하는 것임
        $validated = $request->validate([
            'title'=>'required|max:255',
            'content'=>'required',
            'user_id'=>'required' // 나중에는 로그인 세션에서 가져올 것임
        ]);
        // Post(model)는 posts 테이블과 연결되어 있음
        $post = Post::create($validated); // 유효성 검사가 완료된 친구를 넣음
        return response()->json($post,201); // 201 : created  성공 코드
    }
}
