<template>
  <div class="home">
    <div class="home_left">
      <weather />
      <rose-chart />
      <gauge />
    </div>
    <div class="home_main">
      <main-map :GlobalMapData='GlobalMapData' @provideMapData='provideMapData' />
    </div>
    <div class="home_info">
      <div class="back" @click="backArea">返回</div>
      <ul>
        <li v-for="(item,index) in currentAreaCode" :key="index" @click="backToArea(item)">{{item.name}}></li>
      </ul>
    </div>
    <div class="home_right">
      <column-chart />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Weather from "../components/weather";
import RoseChart from "../components/roseChart";
import Gauge from "../components/gaugeChart";
import ColumnChart from '../components/columnChart'
import MainMap from "../components/mainMap";
import { useStore } from "vuex";
import { computed, provide, reactive } from 'vue';

export default {
  name: "Home",
  setup() {
    const store = useStore();
    let currentAreaCode = computed(() => store.state.mapData.currentAreaCode);
    let GlobalMapData=reactive({
      ljm:[]
    })
    provide('GlobalMapData',GlobalMapData)
    const provideMapData=(val)=>{
      GlobalMapData.ljm=val
    }
    return {store,currentAreaCode,GlobalMapData,provideMapData}
  },
  components: {
    Weather,
    RoseChart,
    Gauge,
    ColumnChart,
    MainMap,
  },
  methods:{
    backArea(){
      this.store.commit('mapData/PopCurrentAreaCode')
    },
    backToArea(item){
      this.store.commit('mapData/BackToCurrentAreaCode',item.areaCode)
    },
    
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  padding: 20px 20px 20px 20px;
  position: relative;
  display: flex;
  .home_left {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .home_main {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .home_right {
    position: absolute;
    right: 20px;
  }
  .home_info {
    align-self: baseline;
    margin-left: 20px;
    z-index: 10;
    display: flex;
    position: absolute;
    left: 450px;
    .back{
      cursor: pointer;
      color: #038dfd;
    }
    ul{
      display: flex;
      margin-left: 20px;
      li{
        color: #038dfd;
        list-style: none;
      }
    }
  }
}
</style>
