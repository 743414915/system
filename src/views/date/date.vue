<template>
    <div class="box">
        <el-calendar v-model="date">
            <template #header="{ date }">
                <span class="slogan">好好学习，天天向上</span>
                <span class="slogan">{{ date }}</span>
                <el-button-group>
                    <el-button size="default" @click="selectDate('prev-month')">上个月</el-button>
                    <el-button size="default" @click="selectDate('today')">今天</el-button>
                    <el-button size="default" @click="selectDate('next-month')">下个月</el-button>
                </el-button-group>
            </template>
        </el-calendar>
    </div>
</template>

<script>
  export default {
    name: "date",
    data() {
      return {
        date: new Date(),
      }
    },
    methods: {
      selectDate(date) {
        switch (date) {
          case "prev-month":
            this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
            break
          case "today":
            this.date = new Date()
            break
          case "next-month":
            this.date = new Date(this.date.setMonth(this.date.getMonth() + 1))
            break
        }
      }
    }
  }
</script>

<style scoped>
    .box {
        width: 100%;
        text-align: center;
        line-height: 0;
        font-size: 18px;
    }

    .slogan{
        color: #ff2db5;
    }

    ::v-deep .el-calendar {
        color: #ff76b9;
        background: no-repeat center/100% url("../../assets/img/date/dateBackground.png");
    }

    ::v-deep button {
        background: rgb(244, 236, 240);
    }

    ::v-deep thead {
        height: 50px
    }

    ::v-deep tbody {
        line-height: 75px;
    }

    ::v-deep .el-calendar__header {
        line-height: 33px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    ::v-deep .el-calendar__body {
        padding-bottom: 0px;
        padding-top: 0px;
    }
</style>