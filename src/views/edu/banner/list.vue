<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bannerQuery.name" placeholder="课程名称" />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-time-picker placeholder="选择开始时间" v-model="bannerQuery.begin" value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00" type="datetime"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-time-picker placeholder="选择截止时间" v-model="bannerQuery.end" value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00" type="datetime"></el-time-picker>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="80" />
      <el-table-column prop="imageUrl" label="图片url" />
      <el-table-column prop="linkUrl" label="链接地址" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper" @current-change="getList" />
  </div>
</template>
<script>
import banner from "@/api/edu/banner";
export default {
  data() {
    //定义变量和初始值
    return {
      list: null, //查询之后接口返回集合
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      bannerQuery: {}, //条件封装对象
    };
  },
  created() {
    //调用
    this.getList();
  },
  methods: {
    //课程列表的方法
    getList(page = 1) {
      this.page = page;
      banner
        .getBannerListPage(this.page, this.limit, this.bannerQuery)
        .then((response) => {
          //response接口返回的数据
          this.list = response.data.items;
          this.total = response.data.total;
          console.log(this.list);
          console.log(this.total);
        }); //表示成功
    },

    //删除课程
    removeDataById(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        //调用删除的方法
        banner.deleteBannerById(id).then((response) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //回到列表页面
          this.getList();
        });
      });
    },
    resetData() {
      //清空的方法
      //表单输入项数据清空
      this.bannerQuery = {};
      //查询所有讲师数据
      this.getList();
    },
  },
};
</script>
