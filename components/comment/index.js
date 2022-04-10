import {
    likeCommentById
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        async likeComment() {
            const result = await likeCommentById(this.properties.comment.id)
            console.log(result);
        }
    }
})