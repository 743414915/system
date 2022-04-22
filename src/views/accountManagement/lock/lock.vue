<template>
    <el-table
            :data="filterTableData"
            style="width: 80%"
            stripe
            @cell-mouse-enter="rowClick">
        <el-table-column type="index" width="50"/>
        <el-table-column
                label="姓名"
                prop="name"
                column-key="name">
        </el-table-column>
        <el-table-column
                label="系别"
                prop="department">
        </el-table-column>
        <el-table-column
                label="宿舍楼号"
                prop="hostelnum">
        </el-table-column>
        <el-table-column
                align="right">
            <template #header>
                <el-input v-model="search"
                          size="small"
                          placeholder="请输入关键字"
                          class="search">
                    <template #append>
                        <el-button
                                :icon="Search"
                                size="small">
                        </el-button>
                    </template>
                </el-input>
            </template>
            <template #default="scope">
                <div>
                    <el-button type="primary" size="small" @click="forzen(0)">解冻</el-button>
                    <el-button type="primary" size="small" @click="forzen(1)">冻结</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

  import {Search} from '@element-plus/icons-vue'
  import {ElMessage} from 'element-plus'

  import {selectAllNotBy, selectUser} from "network/users";
  import {freezeOrNot} from "network/accountInfo"

  export default {
    name: "lock",
    setup() {
      return {
        Search,
      }
    },
    created() {
      selectAllNotBy().then(res => {
        this.tableData = res.data
        console.log(this.tableData[0]);
      })
    },
    data() {
      return {
        search: '',
        radioValue: 1,
        tableData: [],
        userId: 0,
      }
    },
    computed: {
      filterTableData() {
        return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
      },
    },
    methods: {
      rowClick(row) {
        this.userId = row.userid
      },
      forzen(isForzen) {
        freezeOrNot(this.userId, isForzen).then(res => {
          if (res.code === 10000) {
            this.$message.success(res.msg)
          }
        })
      }
    }
  }
</script>

<style scoped>
    .search {
        width: 200px;
    }

    /deep/ .el-input-group__append:hover {
        background: rgb(236, 245, 255);
        color: rgb(64, 158, 255);
    }
</style>