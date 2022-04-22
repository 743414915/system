<template>
    <div class="box">
        <el-input
                v-model="keyword"
                class="search"
                size="large"
                placeholder="请输入查找关键字"
                @keyup.enter="select"
        >
            <template #append>
                <el-button
                        :icon="Search"
                        @click="select">
                </el-button>
            </template>
        </el-input>
    </div>
    <el-scrollbar height="603.6px">
        <p v-for="item of this.selectInfo" :key="item" class="scrollbar-demo-item">
            <el-descriptions title="" :column="3" border>
                <el-descriptions-item
                        label="姓名"
                        label-align="left"
                        align="center"
                        label-class-name="my-label"
                        class-name="my-content"
                        width="110px"
                >{{item.name}}
                </el-descriptions-item
                >
                <el-descriptions-item
                        label="电话"
                        label-align="left"
                        align="center"
                        width="110px">
                    {{item.phone}}
                </el-descriptions-item
                >
                <el-descriptions-item
                        label="发布时间"
                        label-align="left"
                        align="center"
                        width="110px">
                    <el-tag>{{date(item.releasedate)}}</el-tag>
                </el-descriptions-item
                >
                <el-descriptions-item
                        label="内容"
                        label-align="left"
                        align="left">
                    {{item.context}}
                </el-descriptions-item>
            </el-descriptions>
        </p>
        <p class="scrollbar-demo-item">没有更多了</p>
    </el-scrollbar>
</template>

<script>

  import {Search} from '@element-plus/icons-vue'
  import {ElMessage} from 'element-plus'

  import {handleDate} from "common/utils";

  import {selectAll, selectLike} from "network/lostandfound";

  export default {
    name: "selectInfo",
    setup() {
      return {
        Search,
      }
    },
    data() {
      return {
        selectInfo: [],
        keyword: "",
      }
    },
    created() {
      selectAll().then(res => {
        this.selectInfo = res.data
      })
    },
    methods: {
      error(msg, type) {
        ElMessage({
          message: msg,
          type: type,
        })
      },
      select() {
        let keyword = `%${this.keyword}%`
        selectLike(keyword).then(res => {
          if (res.code === 10000) {
            this.selectInfo = res.data
            this.error(res.msg, "success")
          } else {
            this.error(res.msg, "error")
          }
        })
      }
    },
    computed: {
      date() {
        return (time) => handleDate(time)
      }
    }
  }
</script>

<style scoped>

    .box {
        position: fixed;
        top: 35px;
        right: 38px;
        z-index: 999;
    }

    .search {
        width: 286px;
    }

    /deep/ .el-input-group__append:hover {
        background: rgb(236, 245, 255);
        color: rgb(64, 158, 255);
    }

    .scrollbar-demo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        margin: 10px 10px 10px 10px;
        text-align: center;
        border-radius: 4px;
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
    }

    .scrollbar-demo-item:nth-child(1) {
        margin-top: 50px;
    }

    /deep/ .is-el-descriptions--default {
        width: 100%;
    }

    /deep/ .el-descriptions__table {
        height: 100px;
    }

</style>