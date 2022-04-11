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
// 发表评论
const sendComment = async (data) => {
    const result = await request.post(`/comment`, data, true)
    return result
}
// 删除评论
const deleteComment = async (commentId) => {
    const token = wx.getStorageSync('TOKEN_KEY')
    const Authorization = `Bearer ` + token
    const result = await request.delete(`/comment/${commentId}`,{},true,Authorization)
    return result
}
export {
    likeCommentById,
    userIsLike,
    sendComment,
    deleteComment
}