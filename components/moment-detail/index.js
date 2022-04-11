import {
    sendComment
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
        }
    },
    data: {
        show: false,
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
            wx.navigateTo({
                url: '/pages/Moment/index?id=' + this.data.moment.id
            })
        },
        onReplyCommentValue(event) {
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
                    const result = await getMomentCommentById(this.properties.moment.id, 0, 20)
                    this.setData({
                        moment: {
                            ...this.properties.moment,
                            comments: [...result]
                        },
                        content: ''
                    })
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
        }
    },
    // 我爱你就像飞蛾扑火那样无所畏惧
})