<template>
  <el-form status-icon label-width="120px" class="demo-ruleForm">
    <el-form-item label="账号">
      <el-input
        v-model="user.username"
        autocomplete="off"
        placeholder="请输入账号"
        :prefix-icon="Avatar"
        @keyup.enter="submit"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        type="password"
        v-model="password"
        autocomplete="off"
        placeholder="请输入密码"
        :prefix-icon="Key"
        @keyup.enter="submit"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submit"
        :plain="true"
        :type="type"
        :message="message"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { login } from "network/login";

import { ElMessage } from "element-plus";
import { Avatar, Key } from "@element-plus/icons-vue";

import { setCookie, getCookieObj } from "common/utils";

export default {
  name: "login",
  setup() {
    return {
      Avatar,
      Key,
    };
  },
  data() {
    return {
      user: {
        username: "",
        token: "",
        userId: 0,
        avatar: "",
        permissions: 0, // 默认用户权限
      },
      password: "",
      checkPass: "",
      type: "",
      message: "",
    };
  },
  created(){
    console.log("***************login*****************")
  },
  methods: {
    submit() {
      login(this.user.username, this.password).then((res) => {
        console.log(res);
        if (res.code === 20000) {
          //判断账号是否冻结，为0表示正常，此时可以登录；为1表示冻结，此时不可以登录
          if (res.data.frozen === 0) {
            this.user.token = res.msg;
            this.user.username = res.data.name;
            this.user.userId = res.data.userid;
            this.user.avatar = res.data.logo;
            this.user.permissions = res.data.permissions;

            setCookie("userInfo", JSON.stringify(res.data), 1);
            this.$store.dispatch("AaddBase", this.user);
            this.$router.replace("/main/index").catch((eer) => {
              eer;
            });
            ElMessage({
              message: "登陆成功！",
              type: "success",
            });
          } else {
            ElMessage({
              message: "账号为冻结状态，请联系管理员解冻！",
              type: "error",
            });
          }
        } else {
          ElMessage({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
::v-deep .el-icon {
  color: rgb(131, 176, 222);
}

::v-deep input::-webkit-input-placeholder {
  color: rgb(131, 176, 222);
}

::v-deep .el-input__inner {
  background-color: rgb(213, 215, 210);
}
</style>