<template>
  <div id="mainmap" class="mainmap"></div>
</template>

<script>
import * as echarts from "echarts";
import { computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";
// import resize from "../mixin/resize";
// import { reactive } from "vue";
// import AMap from 'AMap'
// import AMapUI from 'AMapUI'
export default defineComponent({
  setup(props, context) {
    console.log(props, context);
    const store = useStore();
    let currentAreaCode = computed(() => store.state.mapData.currentAreaCode); //返回所需的区域堆栈
    //监听地图层级变化，重新渲染地图
    watch(
      currentAreaCode,
      (val) => {
        getGeoJson(val[val.length - 1].areaCode);
      },
      { deep: true }
    );

    let geoJson = {}; //地图渲染数据
    let myChart; //渲染地dom节点
    //获取地图json数据
    const getGeoJson = (adcode) => {
      /* eslint-disable no-undef */
      AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          if (Json.length > 0) {
            geoJson.features = Json;
          }
          getMapData(Json);
        });
      });
    };
    //随机生成区域value
    const getMapData = (Json) => {
      const randomValue = () => {
        return Math.floor(Math.random() * 400);
      };
      let mapDataList = Json.map((item) => {
        return {
          name: item.properties.name,
          value: randomValue(),
          areaCode: item.properties.adcode,
        };
      });
      context.emit('provideMapData',mapDataList)
      initEcharts(mapDataList);
    };
    //渲染地图
    const initEcharts = (mapDataList) => {
      echarts.registerMap("Cmap", geoJson, {});
      let option = {
        title: {
          text: "china map",
          top: "top",
          left: "center",
          textStyle: {
            color: "#038dfd",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: (p) => {
            let val = p.value;
            if (window.isNaN(val)) {
              val = 0;
            }
            let txtCon = p.name + "<br>" + "<hr>" + "数值 : " + val.toFixed(2);
            return txtCon;
          },
        },
        visualMap: [
          {
            show: true,
            type: "continuous",
            left: "right",
            min: 50,
            max: 400,
            inRange: {
              color: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8"],
            },
            text: ["High", "Low"], // 文本，默认为数值文本
            calculable: true,
          },
        ],
        // geo: {
        //   map: "Cmap",
        //   show: true,
        //   itemStyle: {
        //     shadowColor: "#092f8f", //外发光
        //     shadowBlur: 10,
        //     shadowOffsetX:10,
        //     shadowOffsetY:10
        //   },
        // },
        series: [
          {
            name: "chinamap",
            type: "map",
            map: "Cmap",
            // aspectScale: 0.85,
            roam: true,
            left:'center',
            top:'middle',
            itemStyle: {
              shadowColor: "#092f8f", //外发光
              shadowBlur: 5,
              shadowOffsetX: 10,
              shadowOffsetY: 10,
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#FFF",
                },
              },
              emphasis: {
                //对应的鼠标悬浮效果
                show: true,
                textStyle: {
                  color: "red",
                },
              },
            },

            data: mapDataList,
          },
        ],
      };
      myChart = echarts.init(document.getElementById("mainmap"));
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption(option);
      myChart.on("click", echartsMapClick);
    };
    //监听地图点击事件，修改地图层级，监听currentAreaCode的值从而重新渲染
    const echartsMapClick = (param) => {
      if(currentAreaCode.value.length===3){
        return
      }
      store.commit("mapData/PushCurrentAreaCode", param.data);
    };
    return { getGeoJson };
  },
  mounted() {
    this.getGeoJson(100000);
  },
  methods: {},
});
</script>

<style></style>
