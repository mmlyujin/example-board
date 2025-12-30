import { useState } from 'react'
import axios from 'axios'

function App() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        try {
            /*TODO::
            *  url 상수로 빼기(config)
            *  axios를 함수로 빼기
            *  axiosInstance 활용하기
            * */
            // Laravel의 store 창구로 JSON 데이터 전달
            const response = await axios.post('http://127.0.0.1:8000/api/posts', {
                title: title,
                content: content,
                user_id: 1 // 임시
            });

            console.log("서버 응답:", response.data);
            alert("글 저장 성공!");
            setTitle(''); // 입력창 비우기
            setContent('');
        } catch (error) {
            console.error("에러 발생:", error);
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