<template>
  <div class="common_border">
    <div class="common_topbox">
      <p class="common_topbox_title">>>玫瑰图</p>
    </div>
    <div id="rosechart" class="common_content">{{ljm}}</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  setup() {
    let option = {
        title:{
            text:'XXX季度XXX统计图',
            left:'center',
            textStyle:{
                fontSize:14,
                color:'#038dfd'
            }
        },
      legend: {
          type:'scroll',
        top: "bottom",
        pageTextStyle:{
            color:'#038dfd'
        },
        pageIconColor:'#038dfd'
      },
      toolbox: {
        show: false,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "面积模式",
          type: "pie",
          radius: [10, 50],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 6,
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 32, name: "rose 5" },
            { value: 30, name: "rose 6" },
          ],
        },
      ],
    };
    
    return {option}
  },
  mounted(){
    var chartDom = document.getElementById("rosechart");
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.option)
  }
};
</script>

<style></style>
