import request from '../request/index'
// 用户注册
const userRegistry = async (name, password) => {
    const result = await request.post("/users", {
        name,
        password
    })
    return result
}
// 用户登录
const userLogin = async (name, password) => {
    const result = await request.post("/login", {
        name,
        password
    })
    return result
}
// 获取用户信息
const getUserInfoById = async (userId) => {
    const result = await request.get(`/users/${userId}`)
    return result
}
export {
    userRegistry,
    userLogin,
    getUserInfoById
}