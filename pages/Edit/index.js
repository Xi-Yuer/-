import {
    sendMoment,
    addTags
} from '../../service/moment/index'
import {
    BASE_URL
} from '../../service/config/index'
Page({
    data: {
        fileList: [],
        token: wx.getStorageSync('TOKEN_KEY'),
        labels: [],
        message:'',
        value: ''
    },
    // 添加标签
    AddTag(e) {
        const tag = e.detail.value
        this.setData({
            labels: [...this.data.labels, tag],
            value: ''
        })
    },
    onChange(event) {
        const content = event.detail
        this.setData({
            content
        })
    },
    afterRead(event) {
        const {
            file
        } = event.detail;
        for (let i of file) {
            this.setData({
                fileList: [...this.data.fileList, {
                    url: i.url
                }]
            })
        }
    },
    deleteImg(event) {
        const delIndex = event.detail.index
        const {
            fileList
        } = this.data
        fileList.splice(delIndex, 1)
        this.setData({
            fileList
        })
    },
    // 添加图片
    loadFile(momentId) {
        if (this.data.fileList.length) {
            for (let file of this.data.fileList) {
                wx.uploadFile({
                    filePath: file.url,
                    name: 'picture',
                    url: `${BASE_URL}/upload/picture?momentId=${momentId}`,
                    header: {
                        Authorization: 'Bearer ' + this.data.token
                    }
                })
            }
        }
    },
    async sendMoment() {
        const result = await sendMoment(this.data.content)
        const momentId = result.data.insertId
        await this.loadFile(momentId)
        if (this.data.labels.length) {
            await addTags(momentId, this.data.labels)
        }
        wx.showToast({
            title: '发表成功',
        })
        wx.switchTab({
            url: '/pages/Home/index'
        })
    }

})