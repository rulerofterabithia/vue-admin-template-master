import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //添加小节
    addVideo(video) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
        })
    },

    //删除小节
    deleteVideo(id) {
        return request({
            url: '/eduservice/video/' + id,
            method: 'delete'
        })
    },

    //删除阿里云中的视频
    deleteAliyunVideo(id) {
        return request({
            url: '/eduvod/video/removeAliyunVideo/' + id,
            method: 'delete'
        })
    },
    //根据id查询小节
    getVideoInfo(videoId) {
        return request({
            url: '/eduservice/video/getVideoInfo/' + videoId,
            method: 'get',
        })
    },
    //修改小节
    updateVideo(video) {
        return request({
            url: '/eduservice/video/updateVideo',
            method: 'post',
            data: video
        })
    },

}