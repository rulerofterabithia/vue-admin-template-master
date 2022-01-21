import request from '@/utils/request'

export default {

    //课程列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getCourseListPage(current, limit, courseQuery) {
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequetBody获取数据
            //data表示把对象转换成json进行传递到接口里面
            data: courseQuery
        })
    },

    //删除课程
    deleteCourse(id) {
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete',
        })
    },

    //TODO课程列表
    getCourseList() {
        return request({
            url: '/eduservice/course',
            method: 'get'
        })
    },

    //课程最终发布
    publishCourse(id) {
        return request({
            url: '/eduservice/course/publishCourse/' + id,
            method: 'post'
        })
    },

    //课程确认信息显示
    getPublishCourseInfo(id) {
        return request({
            url: '/eduservice/course/getPublishCourseInfo/' + id,
            method: 'get'
        })
    },

    //根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduservice/course/getCourseInfo/' + id,
            method: 'get'
        })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },

    //1、添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },

    //2、查询所有讲师
    getTeacherList() {
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get',
        })
    }
}