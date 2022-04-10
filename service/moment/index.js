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

export {
    getMomentList,
    getUserAllMoment,
    getMomentById,
    userIsLikeMoment,
    likeMomentById
}