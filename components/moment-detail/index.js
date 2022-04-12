import {
    sendComment,
    deleteComment
} from '../../service/comment/index'
import {
    getMomentCommentById,
    deleteMoment
} from '../../service/moment/index'
Component({
    properties: {
        moment: {
            type: Object,
            value: {}
        },
        comment: {
            type: Array,
            value: []
        }
    },
    data: {
        show: false,
        load: true,
        imgIndex: 0,
        content: ''
    },
    methods: {
        onClickShow(e) {
            const imgIndex = e.target.dataset.index
            wx.previewImage({
                urls: [...this.properties.moment.images],
                current: this.properties.moment.images[imgIndex]
            })
        },

        onClickHide() {
            this.setData({
                show: false
            });
        },
        // 路由跳转
        navToMoment() {
            wx.redirectTo({
                url: '/pages/Moment/index?id=' + this.data.moment.id
            })
        },
        ReplyCommentValue(event) {
            const content = event.detail.value
            this.setData({
                content
            })
        },
        async Reply() {
            if (this.data.content !== '') {
                const result = await sendComment({
                    momentId: this.properties.moment.id,
                    content: this.data.content
                })
                if (result.status === 1) {
                    // 发表评论成功
                    // 重新获取评论
                    // const result = await getMomentCommentById(this.properties.moment.id, 0, 50)
                    // this.setData({
                    //     comment: result,
                    //     content: ''
                    // })
                    this.navToMoment()
                }
            } else {
                wx.showToast({
                    title: '内容不能为空',
                    icon: 'error'
                })
            }
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
                                // 删除成功]
                                wx.navigateBack()
                            } else {
                                wx.showToast({
                                    title: '您不具备权限',
                                    icon: 'error'
                                })
                            }
                        })
                    }
                }
            })
        },
        // 删除评论
        async deleteComment(e) {
            const id = e.currentTarget.dataset.id
            const result = await deleteComment(id)
            if (result.status === 1) {
                // 成功
                // 重新获取评论
                // const result = await getMomentCommentById(this.properties.moment.id, 0, 20)
                // this.setData({
                //     comment: result
                // })
               this.navToMoment()
            } else {
                wx.showToast({
                    title: '您没有权限',
                    icon: 'error'
                })
            }
        }
    },
    // 我爱你就像飞蛾扑火那样无所畏惧
})