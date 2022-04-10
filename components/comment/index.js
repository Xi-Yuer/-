import {
    likeCommentById,
    userIsLike
} from '../../service/comment/index'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        comment: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isLike: false
    },
    lifetimes: {
        attached: async function () {
            const result = await userIsLike(this.properties.comment.id)
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
    methods: {
        async likeComment() {
            const result = await likeCommentById(this.properties.comment.id)
            if (result.status === 1) {
                this.setData({
                    comment: {
                        ...this.properties.comment,
                        likeCount: this.properties.comment.likeCount += 1
                    },
                    isLike: true
                })
            } else if (result.status === 0) {
                this.setData({
                    comment: {
                        ...this.properties.comment,
                        likeCount: this.properties.comment.likeCount -= 1
                    },
                    isLike: false
                })
            } else {
                wx.showToast({
                    title: '请登录之后在操作',
                })
            }
        }
    }
})