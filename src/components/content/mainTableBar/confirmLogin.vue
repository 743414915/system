<template>
  <div class="flex flex-wrap items-center" style="margin-top: 10px">
    <el-dropdown split-button type="primary" @click="handleClick">
      {{ username }}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="perfectInfo">完善个人信息</el-dropdown-item>
          <el-dropdown-item @click="modifyPassword">修改密码</el-dropdown-item>
          <el-dropdown-item @click="uploadAvatar"
            >用户头像上传</el-dropdown-item
          >
          <el-dropdown-item @click="date">日历</el-dropdown-item>
          <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { ArrowDown } from "@element-plus/icons-vue";

import { getCookieObj, removeCookie, isEmptyObj } from "common/utils";
export default {
  inject: ["refresh"],
  name: "confirmLogin",
  setup() {
    return {
      ArrowDown,
      user: {
        username: "",
        token: "",
        userId: "",
        avatar: "",
      },
    };
  },
  created() {
    let cookieObj = getCookieObj();
    if (!isEmptyObj(cookieObj)) {
      this.username = cookieObj.username;
    } else {
      this.username = this.$store.state.username;
    }
  },
  methods: {
    perfectInfo() {
      this.$router.replace("/user/perfectInfo").catch((err) => {
        err;
      });
    },
    modifyPassword() {
      this.$router.replace("/user/modifyPassword").catch((err) => {
        err;
      });
    },
    uploadAvatar() {
      this.$router.replace("/user/uploadAvatar").catch((err) => {
        err;
      });
    },
    signOut() {
      removeCookie("userInfo");
      console.log("********confirmLogin***********");
      this.$store.commit("DeledtBase", this.user);
      this.$router
        .replace("/main/index")
        .then(() => {
          this.refresh();
        })
        .catch((err) => {
          err;
        });
    },
    date() {
      this.$router.replace("/main/index").catch((err) => {
        err;
      });
    },
  },
};
</script>

<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>