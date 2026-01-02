import {useEffect, useState} from "react";
import {getPosts, deletePost} from "./api/posts.js";

function PostList() {
    // 게시물 데이터를 담을 바구니를 만든다.(posts)
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] =useState(true); // 로딩 상태 추가

    // 컴포넌트가 처음 뜰 때
    useEffect(()=> {
        fetchData();
    },[]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getPosts(); // 게시물을 비동기적으로 가져온다. 데이터가 올 때까지 기다렸다가 보여주는 것임.
            setPosts(data); // 가져온 데이터를 set
        }catch (error) {
            console.error("데이터 로드 실패:",error);
            alert("목록을 불러오는 중 오류가 발생했습니다.");
        }finally {
            setLoading(false);
        }
    };

    const onDelete = async (id) => {
        if(window.confirm("정말 삭제하시겠습니까???")) {
            try {
                await deletePost(id);
                setPosts(posts.filter(post=>post.id !== id)); // 삭제 후 상태값 업데이트(재렌더링)
                alert("삭제되었습니다.");
            }catch (error) {
                console.error("삭제 실패:",error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    if(loading) return <div>Loading...:)</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>게시물 리스트</h2>
            {posts.length === 0 ? (
                <p>등록된 게시물이 없습니다.</p>
            ) : (
                <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{new Date(post.created_at).toLocaleDateString()}</td>
                            <td>
                                <button
                                    onClick={() => onDelete(post.id)}
                                    style={{ color: "red" }}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default  PostList