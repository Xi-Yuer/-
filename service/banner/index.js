import request from '../request/index'
const getBanner = async () => {
    const result = await request.get('/banner')
    return result
}
export {
    getBanner
}