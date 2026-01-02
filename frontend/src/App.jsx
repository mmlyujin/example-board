import { useState } from 'react'
import {createPost} from "./api/posts.js";

function App() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        try {
            const postData = {
                title:title,
                content:content,
                user_id:1
            }

            // 글 만들어주는 함수 부르면 끝
            const result = await createPost(postData);

            console.log("서버 응답:", result);
            alert("글 저장 성공!");
            setTitle(''); // 입력창 비우기
            setContent(''); // 입력창 비우기
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장 실패! 터미널이나 콘솔을 확인하세요.");
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Board</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br /><br />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea><br /><br />
                <button type="submit">글 올리기</button>
            </form>
        </div>
    )
}

export default App