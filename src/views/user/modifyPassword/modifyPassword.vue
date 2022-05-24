<template>
  <div>
    <el-row
      style="margin-top: 150px"
      v-if="this.active === 0 || this.active === 1"
    >
      <el-input
        readonly="true"
        :placeholder="this.$store.state.username"
        class="username"
      >
        <template #prepend>当前账户：</template>
      </el-input>
    </el-row>
    <el-row>
      <el-input
        class="password"
        v-model="password"
        type="password"
        placeholder="请验证密码"
        show-password
        v-if="this.active === 0"
      ></el-input>
      <el-input
        class="password"
        v-model="newPassword"
        type="password"
        placeholder="请输入新密码"
        show-password
        v-else-if="this.active === 1"
      ></el-input>
    </el-row>

    <img src="~assets/img/right/hook.svg" alt="" v-if="this.active === 3" />
  </div>

  <div class="box">
    <el-steps :active="active" finish-status="success">
      <el-step title="验证密码"></el-step>
      <el-step title="设置新密码"></el-step>
      <el-step title="修改完成"></el-step>
    </el-steps>

    <el-button @click="next">下一步</el-button>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

import { selectUser, modifyPassword } from "network/users";
import { hex_md5 } from "common/md5";

export default {
  name: "modifyPassword",
  data() {
    return {
      user: {},
      user1: {
        username: "",
        token: "",
        userId: "",
        avatar: "",
      },
      active: 0,
      password: "",
      newPassword: "",
    };
  },
  created() {
    selectUser(this.$store.state.username).then((res) => {
      this.user = res.data;
    });
  },
  methods: {
    next() {
      switch (this.active) {
        case 0:
          if (hex_md5(this.password) === this.user.password) {
            this.active++;
          } else {
            ElMessage({
              message: "密码错误",
              type: "error",
            });
          }
          break;
        case 1:
          modifyPassword(
            this.user.userid,
            this.$store.state.username,
            this.newPassword
          ).then((res) => {
            if (res.code === 10000) {
              this.active = 3;
              this.$message.success("密码修改成功，3秒后跳转至登录页面请重新登陆！");
              setTimeout(() => {
                this.$store.commit("DeledtBase", this.user1);
                this.$router.replace("/main/index").catch((err) => {
                  err;
                });
              }, 3000);
            } else {
              ElMessage({
                message: res.msg,
                type: "error",
              });
            }
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
.username {
  width: 200px;
  margin: 0 auto;
}

.password {
  width: 200px;
  margin: 0 auto;
}

.box {
  width: 1000px;
  position: absolute;
  top: 400px;
  left: 360px;
}

::v-deep .el-step__line {
  position: absolute;
  top: 350px;
}

::v-deep .is-text {
  position: absolute;
  left: -10px;
  /*top: 350px;*/
}

::v-deep .el-step__main {
  position: absolute;
  left: -30px;
  top: 20px;
  width: 100px;
}

::v-deep .el-button {
  position: absolute;
  top: 80px;
  left: 470px;
}
</style>