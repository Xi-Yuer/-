import request from '../request/index'
const getMomentList = async (offset, limit) => {
    const result = await request.get("/moment", { offset, limit })
    return result
}
const getUserAllMoment = async (userId) => {
    const result = await request.get(`/moment/all/${userId}`)
    return result
}

export {
    getMomentList,
    getUserAllMoment
}