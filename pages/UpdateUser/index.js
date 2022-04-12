import {
    getUserInfoById
} from '../../service/user/index'
import {
    BASE_URL
} from '../../service/config/index'
Page({
    data: {
        user: {},
        userId: ''
    },
    async getUserInfo(userId) {
        const userResult = await getUserInfoById(userId)
        const userInfo = userResult.data[0]
        this.setData({
            user: userInfo
        })
    },
    onLoad: async function (options) {
        const userId = options.userId
        this.setData({
            userId: userId
        })
        this.getUserInfo(userId)
    },
    // 更新用户头像
    updateAvatar(e) {
        const file = e.detail.file
        const token = wx.getStorageSync('TOKEN_KEY')
        wx.uploadFile({
            filePath: file.url,
            name: 'avatar',
            url: `${BASE_URL}/upload/avatar`,
            header: {
                Authorization: 'Bearer ' + token
            },
            success: (res) => {
                wx.showToast({
                    title: '更新头像成功',
                })
                this.getUserInfo(this.data.userId)
            }
        })
    },
    // 退出登录
    logOut() {
        wx.showModal({
            title: '确定退出登录',
            success(res) {
                if (res.confirm) {
                    wx.clearStorage({
                        success: (res) => {
                            wx.switchTab({
                                url: '/pages/Home/index',
                            })
                        },
                    })
                }
            }
        })
    }
})