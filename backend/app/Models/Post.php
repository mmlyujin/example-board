<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// 모델은 데이터베이스의 테이블과 대화하는 창구
// 어떤 컬럼을 쓸 수 있는지 명시해줘야 함
class Post extends Model
{
    // 여기에 적힌 컬럼만 DB에 한꺼번에 저장할 수 있다.
    protected $fillable = ['title','content','user_id'];
}
