<template>
  <div id="app">
    <!--        <main-tab-bar></main-tab-bar>-->
    <router-view v-if="isRefresh"></router-view>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTableBar/mainTabBar";

export default {
  provide() {
    return {
      refresh: this.refresh,
    };
  },
  name: "app",
  components: {
    MainTabBar,
  },
  data() {
    return {
      isRefresh: true,
    };
  },
  methods: {
    refresh() {
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    },
  },
};
</script>

<style>
</style>
