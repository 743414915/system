<template #left-tab-item>
  <div class="demo-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="人员管理" name="1" v-if="permissions == 1">
        <div>5</div>
        <div>6</div>
        <div>7</div>
      </el-collapse-item>
      <el-collapse-item title="账号管理" name="2" v-if="permissions == 1">
        <div @click="selectRecode">查询账号登陆时间</div>
        <div @click="lock">账号封禁与解封</div>
        <div @click="userList">用户</div>
      </el-collapse-item>
      <el-collapse-item title="设备维修上报" name="3">
        <div @click="selectRepair">查询维修信息</div>
        <div @click="addRepair">上报维修设备</div>
      </el-collapse-item>
      <el-collapse-item title="失物招领" name="4">
        <div @click="selectInfo">查询发布信息</div>
        <div @click="addInfo">发布失物招领</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import JsCookies from "js-cookie";
import { ElMessage } from "element-plus";
import { getCookieObj, isEmptyObj } from "common/utils";

export default {
  name: "tabBarItem",
  data() {
    return {
      token: "",
      permissions: 0,
    };
  },
  created() {
    console.log("*****tabBarItem***********");
    let cookieObj = getCookieObj();
    if (!isEmptyObj(cookieObj)) {
      this.token = cookieObj.token;
      this.permissions = cookieObj.permissions;
    } else {
      this.token = this.$store.state.token;
      this.permissions = this.$store.state.permissions;
    }
    console.log(this.permissions);
  },
  methods: {
    error() {
      ElMessage({
        message: "请先登录",
        type: "error",
      });
    },
    selectRepair() {
      if (this.token !== "") {
        this.$router.replace("/repair/selectRepair").catch((eer) => {
          eer;
        });
      } else {
        this.error();
      }
    },
    addRepair() {
      if (this.token !== "") {
        this.$router.replace("/repair/addRepair").catch((eer) => {
          eer;
        });
      } else {
        this.error();
      }
    },
    selectInfo() {
      if (this.token !== "") {
        this.$router.replace("/lostandfound/selectInfo").catch((eer) => {
          eer;
        });
      } else {
        this.error();
      }
    },
    addInfo() {
      if (this.token !== "") {
        this.$router.replace("/lostandfound/addInfo").catch((eer) => {
          eer;
        });
      } else {
        this.error();
      }
    },
    selectRecode() {
      if (this.token !== "") {
        this.$router.replace("/accountManagement/selectRecode").catch((eer) => {
          eer;
        });
      } else {
        this.error();
      }
    },
    lock() {
      if (this.token !== "") {
        this.$router.replace("/lock/lock").catch((eer) => {
          eer;
        });
      } else {
        this.error();
      }
    },
    userList() {
      if (this.token !== "") {
        this.$router.replace("/userList/userList").catch((eer) => {
          eer;
        });
      } else {
        this.error();
      }
    },
  },
};
</script>


<style scoped>
/deep/ .el-collapse-item__content > div:hover {
  background-color: rgb(211, 220, 230);
  cursor: pointer;
}

.active {
  background-color: rgb(237, 236, 251);
}
</style>