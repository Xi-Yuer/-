const token = wx.getStorageSync('TOKEN_KEY')

const BASE_URL = "http://112.124.28.77:8005"
// 用我已经部署好的
const LOGIN_BASE_URL = "http://112.124.28.77:8005"
// 用我给你的登录服务器代码,自己部署
// const LOGIN_BASE_URL = "http://localhost:3000"

class HYRequest {
  constructor(baseURL, authHeader = {}) {
    this.baseURL = baseURL
    this.authHeader = authHeader
  }

  request(url, method, params, isAuth = false, header = {}) {
    const finalHeader = isAuth ? {
      ...this.authHeader,
      ...header
    } : header
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method: method,
        header: finalHeader,
        data: params,
        success: function (res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }

  get(url, params, isAuth = false, header) {
    return this.request(url, "GET", params, isAuth, header)
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, "POST", data, isAuth, header)
  }
}

const hyRequest = new HYRequest(BASE_URL)

const hyLoginRequest = new HYRequest(LOGIN_BASE_URL, {
  token
})

export default hyRequest
export {
  hyLoginRequest
}