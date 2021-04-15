<template>
  <div class="common_border area">
    <div class="common_topbox">
      <p class="common_topbox_title">>>仪表盘</p>
    </div>
    <div id="gauge1" class="common_content"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    let data = 0;
    let echart
    let option
    const initEcharts = () => {
      echart = echarts.init(document.getElementById("gauge1"));
      option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            startAngle: 90,//开始角度，正右为0度
            endAngle: -270,//结束角度
            min: 0,//刻度盘最小值
            max: 12,
            splitNumber: 12,//刻度分段数
            progress: {//进度条
              show: true,
            },
            detail: {
              valueAnimation: true,
            },
            data: [
              {
                name: "AA",
                value: 0,
                title: {
                  show: false,
                },
                detail: {
                  show: false,
                },
              },
            ],
          },
        ],
      };
      echart.setOption(option);
    };
    const setTimer = () => {
      setInterval(() => {
          data=Math.floor(Math.random()*12)
        //   if(data<12){
        //       data++
        //   }else{
        //       data=0
        //   }
        option.series[0].data[0].value=data
        echart.setOption(option)
      }, 1000);
    };
    return { initEcharts,setTimer };
  },
  mounted() {
    this.initEcharts();
    this.setTimer();
  },
});
</script>

<style scoped>
.area {
  height: 35vh;
  /* width: 100%; */
}
</style>
