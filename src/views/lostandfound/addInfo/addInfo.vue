<template>
    <div class="box">
        <el-row class="mb-4" :gutter="20" justify="space-between">
            <el-col :span="10">
                <el-input placeholder="请填写您的名称" v-model="name">
                    <template #prepend>发布人：</template>
                </el-input>
            </el-col>
            <el-col :span="10">
                <el-input placeholder="请填写您的联系方式" v-model="phone">
                    <template #prepend>联系电话：</template>
                </el-input>
            </el-col>
        </el-row>

        <el-input
                v-model="textarea"
                maxlength="255"
                placeholder="请描述丢失物品详细信息以便于他人核对（不超过255个字）"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 4}"
        >
        </el-input>
        <el-popconfirm
                confirm-button-text="YES"
                cancel-button-text="Cancel"
                :icon="SuccessFilled"
                icon-color="red"
                title="是否确认发布?"
                @confirm="addInfo"
        >
            <template #reference>
                <el-button>发布</el-button>
            </template>
        </el-popconfirm>
    </div>
</template>

<script>

  import {addInfo} from "network/lostandfound";

  import {SuccessFilled} from '@element-plus/icons-vue'
  import {ElMessage} from 'element-plus'

  export default {
    name: "addInfo",
    setup() {
      return {
        SuccessFilled
      }
    },
    data() {
      return {
        name: "",
        phone: "",
        textarea: '',
      }
    },
    methods: {
      error(msg, type) {
        ElMessage({
          message: msg,
          type: type,
        })
      },
      addInfo() {
        if (this.textarea === '') {
          this.error("请输入描述内容！", "error")
        } else {
          addInfo(this.name, this.textarea, this.phone).then(res => {
            if (res.code === 10000)
              this.error(res.msg, "success")
          })
        }
      }
    }
  }
</script>

<style scoped>

    .box {
        width: 660px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    /deep/ .el-input__inner {
        width: 150px
    }

    /deep/ .el-button {
        width: 100px;
        margin: 0 auto;
    }
</style>