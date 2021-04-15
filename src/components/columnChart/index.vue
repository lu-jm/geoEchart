<template>
  <div class="common_border area">
    <div class="common_topbox">
      <p class="common_topbox_title">>>统计图</p>
    </div>
    <div id="columnchart" class="common_content"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { defineComponent, inject, watch } from "vue";

export default defineComponent({
  setup() {
    const GlobalMapData = inject("GlobalMapData");
    let myChart;
    let option;
    let data = [];
    let dataName = [];
    watch(
      GlobalMapData,
      () => {
        option.yAxis.data = [];
        option.series[0].data = [];
        let dataName = option.yAxis.data;
        let data = option.series[0].data;
        GlobalMapData.ljm.forEach((item) => {
          dataName.push(item.name);
          data.push(item.value);
        });
        option.series[0].realtimeSort = false;
        initEchart(); //首次渲染
        // option.series[0].realtimeSort=true
        setTimeout(() => {
        //   option.series[0].realtimeSort = true;
          initEchart(); //为了直接开始动画，进行再次渲染
        }, 3000);

        setInterval(() => {
          initEchart();
        }, 12000);
      },
      { deep: true }
    );
    const init = () => {
      myChart = echarts.init(document.getElementById("columnchart"));
      option = {
        dataset: {
          source: [],
        },
        xAxis: {
          max: "dataMax",
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: dataName,
          animationDuration: 300,
          animationDurationUpdate: 300,
          //   max: 4, // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: false,
            type: "bar",
            data: data,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
              color: "#038dfd",
            },
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
    };
    const initEchart = () => {
      let optionData = option.series[0].data;
      for (let i = 0; i < optionData.length; i++) {
        optionData[i] += Math.floor(Math.random() * 200);
      }
      myChart.setOption(option);
    };
    return { init };
  },
  mounted() {
    this.init();
  },
});
</script>

<style scoped>
.area {
  width: 450px;
  height: calc(100vh - 60px);
}
</style>
