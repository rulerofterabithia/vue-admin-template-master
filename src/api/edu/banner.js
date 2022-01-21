import request from '@/utils/request'

export default {
    //1、幻灯片列表（条件查询分页）
    getBannerListPage(page, limit, bannerQuery) {
        return request({
            url: `/educms/banneradmin/pageBanner/${page}/${limit}`,
            method: 'post',
            data: bannerQuery
        })
    },
    //删除幻灯片
    deleteBannerById(id) {
        return request({
            url: `/educms/banneradmin/removeBanner/${id}`,
            method: 'delete',
        })
    },
    //添加幻灯片
    addBanner(banner) {
        return request({
            url: `/educms/banneradmin/addBanner`,
            method: 'post',
            data: banner
        })
    },
    //根据id查询幻灯片信息
    getBannerInfo(id) {
        return request({
            url: `/educms/banneradmin/getBanner/${id}`,
            method: 'get'
        })
    },
    //修改幻灯片
    updataBannerInfo(banner) {
        return request({
            url: `/educms/banneradmin/updateBanner`,
            method: 'post',
            data: banner
        })
    }
}
