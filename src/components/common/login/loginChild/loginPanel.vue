<template>
    <div class="box">
        <div class="panel">
            <div class="choice">
                <el-tag @click="login" class="hand">登录</el-tag>
                <el-tag @click="register" class="hand">注册</el-tag>
            </div>
            <login v-if="loginClick===true"></login>
            <register v-else></register>
        </div>
    </div>

</template>

<script>

  import Login from "./login";
  import Register from "./register";

  export default {
    name: "loginPanel",
    components: {Register, Login},
    data() {
      return {
        loginClick: true
      }
    },
    methods: {
      login() {
        this.loginClick = true
      },
      register() {
        this.loginClick = false
      }
    }
  }
</script>

<style scoped>

    .box {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        /*background: #d3dce6;*/
        background: no-repeat center/100% url("../../../../assets/img/login/login.jpg");
        /*display: none;*/
    }

    .panel {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: calc(3.3 * -158.2px);
        margin-top: calc(2 * -100px);
    }

    .choice {
        height: 40px;
        width: 200px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-left: 116px;
    }

    .hand:hover {
        cursor: pointer;
        background: rgb(64 158 255);
        color: #fff;
    }
</style>