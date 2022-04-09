// components/active/index.js
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
        imgIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
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
    }
})