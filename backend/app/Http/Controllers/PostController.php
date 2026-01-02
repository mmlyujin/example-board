<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // 목록 보기
    public function index()
    {
        // 팁: 나중에 글이 많아지면 Post::latest()->paginate(10); 으로 페이징 처리를 합니다.
        return Post::latest()->get(); // 검증을 끝내고 저장된 모든 글을 JSON 형태로 리턴
    }

    // 저장하기
    // Request $request -> 손님이 보낸 데이터가 담긴 봉투. 열어서 내용을 확인하고 DB에 담게 된다.
    public function store(Request $request)
    {
        // 프론트에서 보낸 데이터를 유효성 검사한다.
        // 게시물을 저장하기 전에 validate로 유효성 검사를 하는 것임
        $validated = $request->validate([
            'title'=>'required|max:255',
            'content'=>'required',
            'user_id'=>'required|exists:users,id' // 나중에는 로그인 세션에서 가져올 것임
        ]);
        // Post(model)는 posts 테이블과 연결되어 있음
        $post = Post::create($validated); // 유효성 검사가 완료된 친구를 넣음
        return response()->json($post,201); // 201 : created  성공 코드
    }

    // 상세 보기 (GET /api/posts/{id}) 도 있으면 좋습니다.
    public function show($id)
    {
        return response()->json(Post::findOrFail($id));
    }

    // 삭제하기
    public function destroy($id)
    {
        $post = Post::findOrFail($id); // 없으면 404 에러 던짐
        $post->delete();
        return response()->json(['message'=>'삭제되었습니다.'],200);
    }
}
