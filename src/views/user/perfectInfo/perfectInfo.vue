<template>
    <el-row class="mb-4" :gutter="20" justify="space-around">
        <el-col :span="6">
            <el-input readonly="true" :placeholder="this.user.name">
                <template #prepend>用户名：</template>
            </el-input>
        </el-col>
        <el-col :span="8">
            <el-input v-model="this.department">
                <template #prepend>院系：</template>
            </el-input>
        </el-col>
    </el-row>
    <el-row class="mb-4" :gutter="20" justify="space-around">
        <el-col :span="6">
            <el-input v-model="this.hostelnum">
                <template #prepend>所在宿舍：</template>
            </el-input>
        </el-col>
        <el-col :span="8">
            <el-input readonly="true" :placeholder="this.user.resqitdate">
                <template #prepend>注册时间：</template>
            </el-input>
        </el-col>
    </el-row>
    <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="再想想"
            :icon="SuccessFilled"
            icon-color="red"
            title="是否确认提交?"
            @confirm="perfectInfo"
            style="width: 100px"
    >
        <template #reference>
            <el-button>提交</el-button>
        </template>
    </el-popconfirm>
</template>

<script>

  import {SuccessFilled} from '@element-plus/icons-vue'
  import {ElMessage} from 'element-plus'

  import {selectUser, perfectInfo} from "network/users";

  export default {
    name: "perfectInfo",
    setup() {
      return {
        SuccessFilled
      }
    },
    data() {
      return {
        user: {},
        department: '',
        hostelnum: ''
      }
    },
    created() {
      selectUser(this.$store.state.username).then(res => {
        this.user = res.data
        this.department = this.user.department
        this.hostelnum = this.user.hostelnum
      })
    },
    methods: {
      perfectInfo() {
        perfectInfo(this.department, this.hostelnum, this.user.userid).then(res => {
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
</style>