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
        momentArr: []
    },
    async onShow(){
        const momentResult = await getMomentList(0, 10)
        this.setData({
            momentArr: momentResult.data
        })
    },
    onLoad: async function (options) {
        const bannerResult = await getBanner()
        this.setData({
            banner: bannerResult.banner
        })
    }
})