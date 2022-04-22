<template>
    <div class="login">
        <login-panel></login-panel>
    </div>
</template>

<script>

  import LoginPanel from "./loginChild/loginPanel";

  export default {
    name: "login",
    components: {LoginPanel},
    data() {
      return {
        size: "large",
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>