<template>
  <div class="home">
    <div class="home_left">
      <weather />
      <rose-chart />
    </div>
    <div class="home_main"></div>
    <div class="home_right"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Weather from '../components/weather'
import RoseChart from '../components/roseChart'
export default {
  name: "Home",
  components:{
    Weather,
    RoseChart
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  padding: 20px;
  .home_left {
    width: 25%;
    display: flex;
    flex-direction: column;
  }
  .home_main {
    width: 50%;
  }
  .home_right {
    width: 25%;
  }
}
</style>
