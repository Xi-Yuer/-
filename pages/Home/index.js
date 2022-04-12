// pages/Home/index.js.js
import {
    getBanner
} from '../../service/banner/index'
import {
    getMomentList
} from '../../service/moment/index'
Page({
    data: {
        banner: [],
        searchValue: '',
        momentArr: [],
        offset: 0,
        limit: 10,
    },
    async getMomentData() {
        const oldMomentArr = this.data.momentArr
        const addMomentResult = []
        const MomentResult = await getMomentList(this.data.offset, this.data.limit)
        MomentResult.data.forEach(item => {
            addMomentResult.push(item)
        })
        this.setData({
            momentArr: [...oldMomentArr, ...addMomentResult]
        })
    },
    async onShow() {
        this.onPullDownRefresh()
    },
    // 下拉刷新
    async onPullDownRefresh() {
        wx.showLoading({
            title:'正在加载'
        });
        this.setData({
            offset: 0,
            momentArr: []
        })
        await this.getMomentData()
        wx.hideLoading()
        wx.stopPullDownRefresh();
    },
    // 上拉加载
    async scrollToLower() {
        const newOffset = this.data.offset + 10
        this.setData({
            offset: newOffset
        })
        this.getMomentData()
    },
    onLoad: async function (options) {
        wx.showLoading({
            title:'正在加载'
        });
        const bannerResult = await getBanner()
        this.setData({
            banner: bannerResult.banner
        })
        this.getMomentData()
        wx.hideLoading()
    }
})