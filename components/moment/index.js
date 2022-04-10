import {
    userIsLikeMoment,
    likeMomentById
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
        show: false,
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
            if (result.status === 1) {
                this.setData({
                    moment: {
                        ...this.properties.moment,
                        likeCount: this.properties.moment.likeCount += 1
                    },
                    isLike: true
                })
            } else if (result.status === 0) {
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
            this.setData({
                show: true,
                imgIndex: imgIndex
            });
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
        }
    }
})