<template>
  <div v-if="isLogin">请登录</div>
  <div v-else-if="isHasPermissions">您的权限不足</div>
  <div v-else>
    <el-table
      stripe="true"
      :data="tableData"
      style="width: 100%"
      :max-height="maxHeight"
    >
      <el-table-column fixed type="index" :index="indexMethod" label="序号" width="100"> </el-table-column>
      <el-table-column fixed prop="resqitdate" label="注册时间" width="200">
      </el-table-column>
      <el-table-column prop="realname" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="name" label="账号" width="120"> </el-table-column>
      <el-table-column prop="permissions" label="是否管理员" width="100">
      </el-table-column>
      <el-table-column prop="permissions" label="是否管理员" width="100">
      </el-table-column>
      <el-table-column prop="permissions" label="是否管理员" width="100">
      </el-table-column>
      <el-table-column prop="permissions" label="是否管理员" width="100">
      </el-table-column>
      <el-table-column prop="permissions" label="是否管理员" width="100">
      </el-table-column>
      <el-table-column prop="frozen" label="是否冻结" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCookieObj, isEmptyObj } from "common/utils";

import { manageUser } from "network/users";
export default {
  //父组件通过 props 向下传递数据给子组件
  props: {},
  //import引入的组件需要注入此处能使用
  components: {},
  //此处存放数据
  data() {
    return {
      tableData: [],
    };
  },
  //计算属性
  computed: {
    isLogin() {
      return isEmptyObj(getCookieObj("userInfo")) || this.$store.state.token;
    },
    isHasPermissions() {
      return !getCookieObj("userInfo").permissions;
    },
    maxHeight() {
      let height = 0;
      // 40是底部空白区域
      height = window.innerHeight - 40;
      return height;
    },
  },
  //监听data中数据变化
  watch: {},
  //方法集合
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, rows) {
      console.log(`点击了${index + 1}行，数据是${rows}`)
    },
  },
  created() {
    console.log("*****************userList**************");
    let i = 1;
    manageUser().then((res) => {
      res.data.forEach((item) => {
        parseInt(item.permissions)
          ? (item.permissions = "是")
          : (item.permissions = "否");
        parseInt(item.frozen) ? (item.frozen = "是") : (item.frozen = "否");
        item.number = i++;
      });
      this.tableData = res.data;
    });
  }, //生命周期 - 创建完成
  mounted() {}, //生命周期 - 挂载完成
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //若页面有keep-alive缓存，此函数会触发
};
</script>
<style scoped lang="less">
</style>