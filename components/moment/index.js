import {
    userIsLikeMoment,
    likeMomentById,
    deleteMoment
} from '../../service/moment/index'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        moment: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgIndex: 0,
        isLike: false
    },
    lifetimes: {
        attached: async function () {
            const result = await userIsLikeMoment(this.properties.moment.id)
            if (result.status === 1) {
                // 已点赞
                this.setData({
                    isLike: true
                })
            } else if (result.status === 0) {
                this.setData({
                    isLike: false
                })
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        async likeMoment() {
            const result = await likeMomentById(this.properties.moment.id)
            if (result.status === 1 && !this.data.isLike) {
                this.setData({
                    moment: {
                        ...this.properties.moment,
                        likeCount: this.properties.moment.likeCount += 1
                    },
                    isLike: true
                })
            } else if (result.status === 0 && this.data.isLike) {
                this.setData({
                    moment: {
                        ...this.properties.moment,
                        likeCount: this.properties.moment.likeCount -= 1
                    },
                    isLike: false
                })
            } else {
                wx.showToast({
                    title: '请登录之后在操作',
                })
            }
        },
        onClickShow(e) {
            const imgIndex = e.target.dataset.index
            wx.previewImage({
                urls: [...this.data.moment.images],
                current: this.data.moment.images[imgIndex]
            })
        },

        onClickHide() {
            this.setData({
                show: false
            });
        },
        // 路由跳转
        navToMoment() {
            wx.navigateTo({
                url: '/pages/Moment/index?id=' + this.data.moment.id
            })
        },
        // 删除动态
        deleteMoment() {
            wx.showModal({
                content: '确定要删除该动态',
                success: (res) => {
                    const isConfirm = res.confirm
                    if (isConfirm) {
                        deleteMoment(this.properties.moment.id, {}, true).then(res => {
                            if (res.status === 1) {
                                // 删除成功
                                this.setData({
                                    moment: {}
                                })
                            } else {
                                wx.showToast({
                                    title: '您不具备权限',
                                    icon:'error'
                                })
                            }
                        })
                    }
                }
            })
        }
    }
})