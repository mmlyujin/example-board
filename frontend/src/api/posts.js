// 실제 api 함수들(글쓰기, 조회 등)
import axiosInstance from "../utils/axios.js";

// 매개변수 전달
export const createPost = async (postData) => {
    const response = await axiosInstance.post('/api/posts',postData);
    return response.data;
}

// 데이터를 보낼 때는 params 옵션을 써야 함
// axios.get(url,config) 구조임
export const getPosts = async (params)=> {
    // 예: /api/posts?page=1&sort=desc
    const response = await axiosInstance.get('/api/posts', {
        params:params
    });
    return response.data;
}

// 보통 id를 url 뒤에 붙이는 것이 정석
//RESTful API 표준 : Delete /api/posts/1
export const deletePosts = async (postId)=> {
    const response = await axiosInstance.delete(`/api/posts/${postId}`);
    return response.data;
}