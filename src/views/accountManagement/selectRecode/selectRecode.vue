<template>
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
    <el-table :data="tableData" stripe style="width: 50%" class="table">
        <el-table-column type="index" width="100" :index="index" label="序号"/>
        <el-table-column prop="date" label="登录日期"/>
        <el-table-column prop="name" label="账号姓名"/>
    </el-table>
    <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            class="pagination"
            @prev-click="prev"
            @next-click="next"
            @current-change="current"
            :current-page="currentPage"
            hide-on-single-page/>
</template>

<script>
  import {Search} from '@element-plus/icons-vue'

  import {selectRecode, selectSize} from "network/accountInfo"

  export default {
    name: "selectRecode",
    setup() {
      return {
        Search,
      }
    },
    data() {
      return {
        startPage: 0,
        endPage: 10,
        total: 0,
        tableData: [],
        index: 1,
        currentPage: 1,
        keyword: "",
      }
    },
    methods: {
      request(username, startPage) {
        selectRecode(username, startPage, this.endPage).then(res => {
          if (res.code === 10000) {
            this.tableData = res.data
            if (this.currentPage !== 1) {
              this.index = (this.currentPage - 1) * 10 + 1
            } else {
              this.index = 1
            }
          }
        })
      },

      select() {
        selectRecode(this.keyword, this.startPage, this.endPage).then(res => {
          if (res.code === 10000) {
            this.tableData = res.data
          }
        })
        selectSize(this.keyword).then(res => {
          if (res.code === 10000) {
            this.total = res.data
          }
        })
      },

      prev() {
        this.request(this.keyword, this.startPage -= 10)
      },
      next() {
        this.request(this.keyword, this.startPage += 10)
      },
      current(page) {
        this.currentPage = page
        this.request(this.keyword, this.startPage = (page - 1) * 10)
      }
    }
  }
</script>

<style scoped>
    .pagination {
        position: absolute;
        left: 50%;
        top: 80%;
        margin-left: -101.32px;
    }

    /deep/ .el-table__header-wrapper {
        height: 50px;
        line-height: 50px;
    }

    .table {
        margin: 50px auto 0;
    }

    .search {
        width: 286px;
        position: absolute;
        top: 13%;
        left: 35.7%;
    }

    /deep/ .el-input-group__append:hover {
        background: rgb(236, 245, 255);
        color: rgb(64, 158, 255);
    }
</style>