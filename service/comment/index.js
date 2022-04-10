import request from '../request/index'
// 给评论点赞
const likeCommentById = async (commenId) => {
    const result = await request.post(`/comment/${commenId}/like`, {}, true)
    return result
}
export {
    likeCommentById
}