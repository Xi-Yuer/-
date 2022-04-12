import request from '../request/index'
const getMomentList = async (offset, limit) => {
    const result = await request.get("/moment", {
        offset,
        limit
    })
    return result
}
const getUserAllMoment = async (userId) => {
    const result = await request.get(`/moment/all/${userId}`)
    return result
}

const getMomentById = async (momentId) => {
    const result = await request.get(`/moment/${momentId}`)
    return result
}
// 查询用户是否给动态点赞
const userIsLikeMoment = async (momentId) => {
    const result = await request.get(`/moment/${momentId}/islike`, {}, true)
    return result
}
// 给动态点赞
const likeMomentById = async (momentId) => {
    const result = await request.post(`/moment/${momentId}/like`, {}, true)
    return result
}

// 发表动态
const sendMoment = async (content) => {
    const result = request.post("/moment", {
        content
    }, true)
    return result
}
// 给动态添加标签
const addTags = async (momentId, labels) => {
    const result = await request.post(`/moment/${momentId}/labels`, {
        labels
    }, true)
    return result
}
// 获取动态评论
const getMomentCommentById = async (momentId, offset = 0, limmit = 50) => {
    const result = await request.get(`/comment?momentId=${momentId}&limit=${limmit}&offset${offset}`)
    return result
}
// 删除动态
const deleteMoment = async (momentId) => {
    const token = wx.getStorageSync('TOKEN_KEY')
    const Authorization = `Bearer ` + token
    const result = await request.delete(`/moment/${momentId}`,{},true,Authorization)
    return result
}

export {
    getMomentList,
    getUserAllMoment,
    getMomentById,
    userIsLikeMoment,
    likeMomentById,
    sendMoment,
    addTags,
    getMomentCommentById,
    deleteMoment
}