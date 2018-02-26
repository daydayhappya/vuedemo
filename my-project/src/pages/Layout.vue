<template>
<div>
  页眉<br/>
  <router-link to="/page1">Go to page1</router-link><br/>
  <router-link to="/page2">Go to page2</router-link><br/>
  <router-link to="/page3">Go to page3</router-link><br/>
  <router-link to="/list">Go to list</router-link><br/>
  <div >
        <router-view/>
  </div>
  页脚
      <BackTop></BackTop>

</div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
