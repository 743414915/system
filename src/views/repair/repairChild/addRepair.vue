<template>
  <div class="box">
    <el-row class="mb-4" :gutter="20" justify="space-between">
      <el-col :span="6">
        <el-input readonly="true" :placeholder="this.username">
          <template #prepend>上报人：</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input readonly="true" :placeholder="this.users.department">
          <template #prepend>院系：</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input readonly="true" :placeholder="this.users.hostelnum">
          <template #prepend>所在宿舍：</template>
        </el-input>
      </el-col>
    </el-row>

    <el-input
      v-model="textarea"
      maxlength="255"
      placeholder="请描述维修内容（不超过255个字）"
      show-word-limit
      type="textarea"
      :autosize="{ minRows: 4 }"
    >
    </el-input>
    <el-popconfirm
      confirm-button-text="YES"
      cancel-button-text="Cancel"
      :icon="SuccessFilled"
      icon-color="red"
      title="是否确认上报?"
      @confirm="addRepair"
    >
      <template #reference>
        <el-button>上报</el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script>
import { SuccessFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

import { addRepair } from "network/repair";
import { selectUser } from "network/users";

import { getCookieObj, isEmptyObj } from "common/utils";

export default {
  name: "addRepair",
  setup() {
    return {
      SuccessFilled,
    };
  },
  created() {
    let cookieObj = getCookieObj();
    if (!isEmptyObj(cookieObj)) {
      this.username = cookieObj.username;
    } else {
      this.username = this.$store.state.username;
    }
    selectUser(this.username).then((res) => {
      this.users = res.data;
    });
  },
  data() {
    return {
      username: "",
      textarea: "",
      users: {},
    };
  },
  methods: {
    error(msg, type) {
      ElMessage({
        message: msg,
        type: type,
      });
    },
    addRepair() {
      if (this.textarea === "") {
        this.error("请输入维修内容！", "error");
      } else {
        addRepair(this.username, this.textarea).then((res) => {
          if (res.code === 10000) this.error(res.msg, "success");
        });
      }
    },
  },
};
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
  width: 100px;
}

/deep/ .el-button {
  width: 100px;
  margin: 0 auto;
}
</style>