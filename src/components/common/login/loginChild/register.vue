<template #="register">
    <el-form
            status-icon
            label-width="120px"
            class="demo-ruleForm">
        <el-form-item label="账号">
            <el-input
                    v-model="username"
                    autocomplete="off"
                    placeholder="请输入账号"
                    :prefix-icon="Avatar"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password"
                      v-model="password"
                      autocomplete="off"
                      placeholder="请输入密码"
                      :prefix-icon="Key"></el-input>
        </el-form-item>
        <el-form-item label="校验密码">
            <el-input type="password"
                      v-model="checkPass"
                      autocomplete="off"
                      placeholder="请再次输入密码"
                      :prefix-icon="Key"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"
                       @click="submit"
                       :plain="true">
                注册
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>

  import {register} from "network/login";

  import {ElMessage} from 'element-plus'
  import {Avatar, Key} from '@element-plus/icons-vue'

  export default {
    name: "register",
    setup() {
      return {
        Avatar,
        Key
      }
    },
    data() {
      return {
        username: '',
        password: '',
        checkPass: '',
        type: '',
        message: '',
      }
    },
    methods: {
      submit() {
        register(this.username, this.password, this.checkPass).then(res => {
          console.log(res);
          if (res.code === 10000) {
            ElMessage({
              message: res.msg,
              type: 'success',
            })
          } else {
            ElMessage({
              message: res.msg,
              type: 'error',
            })
          }

        })
      }
    }
  }
</script>

<style scoped>
    /deep/ .el-icon {
        color: rgb(131, 176, 222);
    }

    /deep/ input::-webkit-input-placeholder {
        color: rgb(131, 176, 222);
    }

    /deep/ .el-input__inner {
        background-color: rgb(213, 215, 210);
    }
</style>