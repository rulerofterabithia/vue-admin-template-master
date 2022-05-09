<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="幻灯片名称">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="幻灯片排序">
        <el-input-number v-model="banner.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="图片阿里云url">
        <el-input v-model="banner.imageUrl" />
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="banner.linkUrl" :rows="10" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import banner from "@/api/edu/banner";

export default {
  data() {
    return {
      banner: {
        title: "",
        sort: 0,
        imageUrl: "",
        linkUrl: "",
      },
      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, //上传组件的唯一标识
      BASE_API: process.env.BASE_API, //获取地址
      saveBtnDisabled: false, //保存按钮是否禁用
    };
  },
  created() {
    this.init();
  },
  //监听
  watch: {
    //路由变化的方式，当路由发生变化，方法就会执行
    $route(to, from) {
      console.log("watch $route");
      this.init();
    },
  },
  methods: {

    init() {
      //判断路径中是否有id值
      if (this.$route.params && this.$route.params.id) {
        //从路径中获取id值
        const id = this.$route.params.id;
        //调用根据id查询的方法
        this.getInfoById(id);
      } else {
        this.banner = {};
      }
    },

    saveOrUpdate() {
      //判断修改还是新增操作
      //根据banner对象是否有id值来判断
      if (!this.banner.id) {
        //没有id值，新增
        this.saveBtnDisabled = true;
        this.saveData();
      } else {
        //有id值，修改
        this.updateBanner();
      }
    },
    //修改幻灯片的方法
    updateBanner() {
      banner.updataBannerInfo(this.banner).then((resp) => {
        //提示信息
        this.$message({
          message: "修改成功",
          type: "success",
        });
        //回到幻灯片列表 路由跳转
        this.$router.push({ path: "/banner/list" });
      });
    },
    // 保存
    saveData() {
      banner.addBanner(this.banner).then((resp) => {
        //添加成功
        //提示信息
        this.$message({
          message: "添加成功",
          type: "success",
        });
        //回到幻灯片列表 路由跳转
        this.$router.push({ path: "/banner/list" });
      });
    },
    //根据id查询，数据回显
    getInfoById(id) {
      banner.getBannerInfo(id).then((resp) => {
        this.banner = resp.data.item;
      });
    },

  },
};
</script>