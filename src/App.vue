<template>
  <div id="app" :style="{'background-color':bg_color[color_mark],'color': font_color[color_mark]}">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- --------------------------------panney------------------------------------------ -->
    <div class="e-title">
      <e-title @color_switch='modify_bg'></e-title>
    </div>
    <div class="e-left">
      <e-left :l_echart_data="l_echart_value" :font_color_mark="color_mark"></e-left>
    </div>
    <div class="e-right">
      <e-right @r_echart="r_echart_func" @r_known_label="r_known_func" @r_sort_label="r_sort_func" :font_color_mark="color_mark"></e-right>
    </div>
    <div class="e-bottom">
      <e-bottom :b_echart_data="l_echart_value" :b_known_data="l_known_value" :b_sort_data="l_sort_value"></e-bottom>
    </div>
  </div>
</template>

<script>
import EBottom from './components/EBottom.vue';
import ELeft from './components/ELeft.vue';
import ERight from './components/ERight.vue';
import ETitle from './components/ETitle.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    ETitle,
    ELeft,
    ERight,
    EBottom
    // HelloWorld,
  },
  data() {
    return {
      bg_color: ['#F6F6F6','#27292E'],
      font_color: ['#23252A', '#fff'],
      color_mark: 0,
      l_echart_value: new Map(),//左侧图表数据,
      l_known_value: new Array(),//已知结果
      l_sort_value: new Array(),//计算标签
    }
  },
  methods: {
    modify_bg(e) {
      //将颜色标记赋值给color_mark
      this.color_mark = e;
    },
    r_echart_func(e){
      this.l_echart_value = e;
      // .get('echart_key');
      // console.log(this.l_echart_value);
    },
    r_known_func(e){
      this.l_known_value = e;
      // .get('echart_key');
      // console.log(this.l_echart_value);
    },
    r_sort_func(e){
      this.l_sort_value = e;
      // .get('echart_key');
      // console.log(this.l_echart_value);
    },

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  
  /* margin-top: 60px; */
  /* ------panney--------- */
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  background-color: bg_color;
}
.e-title {
  width: 100%;
  height: 7vh;
}
.e-left {
  width: 80%;
  height: 67vh;
  background-color: bg_color;
}
.e-right {
  width: 20%;
  height: 93vh;
  background-color: bg_color;
}
.e-bottom {
  width: 80%;
  height: 26vh;
  position: absolute;
  bottom: 0;
  background-color: bg_color;
}
</style>
