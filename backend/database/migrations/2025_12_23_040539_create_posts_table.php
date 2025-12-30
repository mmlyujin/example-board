<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id(); // 게시글 고유 번호(PK)
            // foreignId('user_id') : users 테이블의 id를 가리킴
            // constrained() : 데이터 무결성 보장(없는 유저 아이디가 들어오는 것을 방지함)
            // onDelete('cascade') : 유저가 탈퇴(삭제)하면, 그 사람이 쓴 글도 같이 싹 지워라
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title'); // 제목
            $table->text('content'); // 내용(긴 글)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
