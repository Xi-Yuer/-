import {
    userRegistry,
    userLogin,
    getUserInfoById
} from '../../service/user/index'
import {
    getUserAllMoment
} from '../../service/moment/index'
import store from '../../store/index'
Page({
    data: {
        showLoginPage: true,
        isLogin: true,
        loginSucessfull: false,
        name: '',
        password: '',
        userInfo: {},
        userMomentList: []
    },
    loginBtnClick() {
        this.setData({
            showLoginPage: false
        })
    },
    registry() {
        this.setData({
            isLogin: !this.data.isLogin
        })
    },
    // 获取 name
    nameInput(v) {
        const name = v.detail.value
        this.setData({
            name
        })
    },
    // 获取 password
    passwordInput(v) {
        const password = v.detail.value
        this.setData({
            password
        })
    },
    // 用户登录
    async AccountBtnClick() {
        if (!this.data.name !== '' && !this.data.password !== '') {
            if (!this.data.isLogin) {
                // 注册逻辑
                const result = await userRegistry(this.data.name, this.data.password)
                if (result.status === 1) {
                    wx.showToast({
                        title: '注册成功',
                    })
                } else {
                    wx.showToast({
                        title: '用户已存在',
                        icon: "error"
                    })
                }
            } else {
                // 登录逻辑
                const result = await userLogin(this.data.name, this.data.password)
                if (result.status === 1) {
                    const token = result.data.token
                    const userId = result.data.id
                    const userInfoResult = await getUserInfoById(userId)
                    wx.setStorageSync('USER_ID', userId)
                    wx.setStorageSync('TOKEN_KEY', token)
                    wx.showToast({
                        title: '登录成功'
                    })
                    await this.getUserMoment()
                    this.setData({
                        userInfo: userInfoResult.data[0],
                        loginSucessfull: true,
                        name: '',
                        password: ''
                    })
                } else {
                    wx.showToast({
                        title: '登录失败',
                        icon: 'error'
                    })
                }
            }
        } else {
            wx.showToast({
                title: '用户名密码为空',
                icon: "error"
            })
        }
    },
    async getUserInfo(){
        const token = wx.getStorageSync('TOKEN_KEY')
        if (token) {
            const userId = wx.getStorageSync('USER_ID')
            const userInfoResult = await getUserInfoById(userId)
            // 将用户信息存储到 store 中
            store.state.userInfo = userInfoResult.data[0]
            this.setData({
                loginSucessfull: true,
                userInfo: userInfoResult.data[0]
            })
        }
    },
    onShow: async function () {
        const token = wx.getStorageSync('TOKEN_KEY')
        if (!token) {
            this.setData({
                showLoginPage: true,
                isLogin: true,
                loginSucessfull: false,
            })
            return
        }
        await this.getUserInfo()
        await this.getUserMoment()
    },
    async getUserMoment() {
        const userId = wx.getStorageSync('USER_ID')
        if (!userId) return
        const momentList = await getUserAllMoment(userId)
        this.setData({
            userMomentList: momentList.data
        })
    },
    // 跳转Edit页面
    navToEdit() {
        wx.navigateTo({
            url: '/pages/Edit/index',
        })
    },
    // 跳转到用户资料编辑页面
    navToUpdateUserInfo() {
        wx.navigateTo({
            url: `/pages/UpdateUser/index?userId=${this.data.userInfo.id}`,
        })
    }
})