// const token = `${wx.getStorageSync('TOKEN_KEY')}`

const BASE_URL = "http://112.124.28.77:8005"
// 用我已经部署好的
const LOGIN_BASE_URL = "http://112.124.28.77:8005"
// 用我给你的登录服务器代码,自己部署
// const LOGIN_BASE_URL = "http://localhost:3000"

class HYRequest {
  constructor(baseURL, authHeader = {}) {
    this.baseURL = baseURL
    // this.authHeader = authHeader'
    this.baseHeader = {
      Authorzation: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0OTU2MzMxNywiZXhwIjoxNjQ5NjQ5NzE3fQ.leCTFeUoqGA8NpkOzQ1I5GP3SNhG5URbuavpcF9blPc`
    }
  }

  request(url, method, params) {
    // const finalHeader = isAuth ? {
    //   ...this.authHeader,
    //   Authorzation: token,
    //   ...header
    // } : header
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method: method,
        header: this.baseHeader,
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

// const hyLoginRequest = new HYRequest(LOGIN_BASE_URL, {
//   token
// })

export default hyRequest
// export {
//   hyLoginRequest
// }