import request from '../request/index'
// 给评论点赞
const likeCommentById = async (commenId) => {
    const result = await request.post(`/comment/${commenId}/like`, {}, true)
    return result
}
// 查询用户是否给该动态点赞
const userIsLike = async (commentId) => {
    const result = await request.get(`/comment/${commentId}/islike`, {}, true)
    return result
}
export {
    likeCommentById,
    userIsLike
}