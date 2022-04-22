<template>
    <div class="common-layout">
        <el-container>
            <el-header>学生生活服务管理系统
                <div class="login">
                    <el-avatar :size="50" :src="this.$store.state.avatar" @error="errorHandler">
                        <img src=" https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                        />
                    </el-avatar>
                    <el-tag :size="size"
                            @click="login"
                            class="words"
                            v-if="$store.state.token === ''">
                    <span>
                        <span>登录</span>
                    </span>
                    </el-tag>
                    <confirm-login v-else></confirm-login>
                </div>
            </el-header>
            <el-container class="bottom">
                <el-aside width="200px">
                    <tab-bar-item></tab-bar-item>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

  import Login from "components/common/login/login";

  import tabBarItem from './tabBarItem'
  import ConfirmLogin from "./confirmLogin";

  export default {
    name: "mainTabBar",
    data() {
      return {
        token: ''
      }
    },
    components: {
      Login,
      tabBarItem,
      ConfirmLogin,
    },
    methods: {
      login() {
        this.$router.replace('/login').catch((eer) => {
          eer
        })
      },
      // 当展示类型为图片的时候，图片加载失败的 fallback 行为
      errorHandler() {
        //	图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为
        return true;
      },
    },
    computed: {}
  }
</script>

<style scoped>


    .login {
        width: 200px;
        float: right;
        display: flex;
        margin: 5px;
        justify-content: space-around;
    }

    .words {
        margin-top: 13px;
    }

    .words:hover {
        cursor: pointer;
        background-color: rgb(64 158 255);
        color: #fff;
    }

    .common-layout .el-header,
    .common-layout .el-footer {
        background-color: #b3c0d1;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 60px;
    }

    .common-layout .el-footer {
        line-height: 60px;
    }

    .common-layout .el-aside {
        background-color: #d3dce6;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 200px;
    }

    .common-layout .el-main {
        background-color: #e9eef3;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 160px;
        height: calc(100vh - 60px - 50px);
    }

    .common-layout > .el-container {
        margin-bottom: 40px;
    }

    .common-layout .el-container:nth-child(5) .el-aside,
    .common-layout .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .common-layout .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

</style>