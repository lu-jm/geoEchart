<template>
  <div class="common_border">
    <div class="common_topbox">
      <p class="common_topbox_title">>>实时天气</p>
      <p class="common_topbox_more">
        当前城市：&lt;武汉&gt;<span class="change_city">切换城市</span>
      </p>
    </div>
    <div class="weather_temp">
      <p class="now_temp"><span>7</span>℃</p>
      <p class="onday_temp">8℃/0℃ 阴</p>
    </div>
    <div class="weather_boxinfo">
        <div class="item" v-for="(item,index) in weatherList" :key="index">
            <p class="item_title">{{item.key}}</p>
            <p class="item_content">{{item.val}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  setup(){
    var weatherList=reactive([])
    weatherList=[{
      key:'空气质量',
      val:'优'
    },{
      key:'风力',
      val:'3~4级'
    },{
      key:'空气湿度',
      val:'37%'
    },{
      key:'体感温度',
      val:'15℃'
    }]
    return {weatherList}
  }
};
</script>

<style lang="scss" scoped>
.change_city {
  border: 1px solid #038dfd;
  border-radius: 7px;
  padding: 0 3px;
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
}
.weather_temp {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 20px 0;
  .now_temp {
    font-size: 20px;
    span {
      font-size: 40px;
    }
  }
  .onday_temp{
      margin-left: 20px;
  }
}
.weather_boxinfo{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item{
    display: flex;
    width: 40%;
    margin-top: 10px;
    .item_title{
      min-width: 80px;
      text-align: center;
      border: 2px solid #038dfd;
      border-right: none;
    }
    .item_content{
      min-width: 60px;
      border: 2px solid #038dfd;
      text-align: center;
    }
  }
}
</style>
