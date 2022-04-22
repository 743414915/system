<template>
    <ul v-infinite-scroll="load" infinite-scroll-immediate="false" class="infinite-list" style="overflow: auto">
        <li v-for="item of this.repair" :key="item" class="infinite-list-item">
            <el-descriptions title="" :column="3" border>
                <el-descriptions-item
                        label="维护申请姓名"
                        label-align="left"
                        align="center"
                        label-class-name="my-label"
                        class-name="my-content"
                        width="110px"
                >{{item.name}}
                </el-descriptions-item
                >
                <el-descriptions-item
                        label="班级院系"
                        label-align="left"
                        align="center"
                        width="110px">
                    {{item.department}}
                </el-descriptions-item
                >
                <el-descriptions-item
                        label="宿舍楼号"
                        label-align="left"
                        align="center"
                        width="110px">
                    {{item.hostelNum}}
                </el-descriptions-item
                >
                <el-descriptions-item
                        label="申报时间"
                        label-align="left"
                        align="center">
                    <el-tag size="small">{{item.reportDate}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                        label="维修完成时间"
                        label-align="left"
                        align="center"
                >
                    <el-tag size="small"
                            v-if="item.finishDate!==null && this.finishDate ===null"
                    >{{item.finishDate}}
                    </el-tag>
                    <el-tag size="small"
                            v-if="item.finishDate===null && this.finishDate !==null"
                    >{{this.finishDate}}
                    </el-tag>
                    <el-tag size="small"
                            v-else-if="item.finishDate!==null && this.finishDate !==null"
                    >{{item.finishDate}}
                    </el-tag>
                    <el-button type="primary"
                               :plain="true"
                               :type="type"
                               :message="message"
                               class="finish"
                               @click="finish(item.repairId)"
                               v-else-if="item.finishDate===null && this.finishDate ===null">
                        维修完成
                    </el-button>
                </el-descriptions-item
                >
                <el-descriptions-item
                        label="维修内容"
                        label-align="left"
                        align="left"
                >{{item.repairContext}}
                </el-descriptions-item
                >
            </el-descriptions>
        </li>
        <li class="infinite-list-item" v-if="flag">没有更多了</li>
    </ul>
</template>

<script>
  import {finishRepair, selectRepair} from "network/repair"

  import {ElMessage} from 'element-plus'


  export default {
    name: "selectRepair",
    data() {
      return {
        finishDate: null,
        repair: [],
        startPage: 0,
        count: 5,
        name: "",
        flag: false,
        repairSize: 0
      }
    },
    created() {
      this.name = this.$store.state.username
      if (this.name === "") {
        console.log("请先登录");
      } else {
        selectRepair(this.name, this.startPage, this.count).then(res => {
          for (let item of res.data) {
            this.repairSize = Number(res.msg)
            this.repair.push(item)
          }
        })
      }
    },
    methods: {
      load() {
        this.startPage += this.count
        if (this.startPage <= this.repairSize + 1) {
          selectRepair(this.name, this.startPage, this.count).then(res => {
            for (let item of res.data) {
              this.repair.push(item)
            }
          })
        } else {
          this.flag = true
        }
      },
      finish(repairId) {
        finishRepair(repairId).then(res => {
          if (res.code === 10000) {
            this.finishDate = res.data
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
    },
    watch: {
      finishDate(newValue) {
        console.log(newValue);
      },
    },
    computed: {}
  }
</script>

<style scoped>

    .index {
        width: 50px;
        height: 124px;
        line-height: 124px;
    }

    .finish:hover {
        cursor: pointer;
        background-color: rgb(64, 158, 255);
        color: rgb(236, 245, 255);
    }

    /deep/ .is-el-descriptions--default {
        width: 100%;
    }

    .infinite-list {
        height: 600px;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .infinite-list .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        /*height: 135px;*/
        background: var(--el-color-primary-light-9);
        margin: 10px;
        color: var(--el-color-primary);
    }

    .infinite-list .infinite-list-item + .list-item {
        margin-top: 10px;
    }

    .my-label {
        background: var(--el-color-success-light-9);
    }

    .my-content {
        background: var(--el-color-danger-light-9);
    }
</style>