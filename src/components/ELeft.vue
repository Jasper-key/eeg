<template>
  <div class="l-mian">
    <!-- 控制uv 和 点数 的模块 -->
    <div class="l-float">
      <input type="button" value="⚙" @click="contro_shade()" class="float-bottom"/>
      <div class="float-shade" v-for="(v, k) in unit_number" :key="k" v-show="on_off == 1">
        <div>
          <span>μv值：</span><input class="shade-input" v-model="unit_number[k]" type="number"/>
        </div>
        <div>
          <span>点数值：</span><input class="shade-input" v-model="hz_num[k]" type="number"/>
        </div>
      </div>
        <button v-show="on_off == 1" @click="drawLine()" class="float-button">确定</button>
    </div>
    <!-- 主体 -->
    <div class="l-left">
      <div v-for="k in 7" :key="k" class="left-title">
        <span>{{ k }}</span>
        <span class="line-point"></span>
        <!-- <span class="line-point">
          <span class="left-point">◽</span>
        </span> -->
        <span class="l-b-text" :style="{ color: font_colors[font_color_mark] }"
          ><b>{{ left_title_data[k - 1] }}</b></span
        >
      </div>
    </div>
    <div class="l-right" id="l-right"></div>
  </div>
</template>

<script>
export default {
  name: "ELeft",
  data() {
    return {
      left_title_data: this.$datas.mark_7,
      font_colors: ["#3c3c3c", "#FFFFFF"],
      unit_number: this.$datas.unit_number,
      hz_num: this.$datas.hz_num,
      on_off: 0
    };
  },
  props: {
    l_echart_data: Map,
    font_color_mark: Number, //字体颜色标记
  },
  mounted() {
    this.font_color_mark = 0;

    // this.drawLine();
    // console.log(this.$datas.mark_7);
  },
  watch: {
    // 检测key值是否变化
    l_echart_data: {
      deep: true,
      handler() {
        this.drawLine();
      },
    },
    // unit_number: {
    //   deep: true,
    //   handler() {
    //     this.drawLine();
    //   },
    // },
    // hz_num: {
    //   deep: true,
    //   handler() {
    //     this.drawLine();
    //   },
    // },
  },
  methods: {
    drawLine() {
      console.log(this.unit_number);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("l-right"));
      // 绘制图表
      myChart.setOption(this.option_data());
      // console.log(this.option_data());
    },
    option_data() {
      // 获取Map数据
      let option_echart_data = this.l_echart_data;
      // 统计 map数据有多少条，少于7条数据，用mark_1
      let temp_oed_num = 0;
      option_echart_data.forEach(function() {
        temp_oed_num += 1;
      });
      if (temp_oed_num - 1 != 7) {
        this.left_title_data = this.$datas.marks;
      } else {
        this.left_title_data = this.$datas.mark_7;
      }
      //获取key
      var option_key = option_echart_data.get("echart_key");
      // key前面加0
      switch (option_key.toString().length) {
        case 1:
          option_key = "000" + option_key.toString();
          break;
        case 2:
          option_key = "00" + option_key.toString();
          break;
        case 3:
          option_key = "0" + option_key.toString();
          break;
        default:
          option_key = option_key.toString();
      }
      // 数据源，需要和key组合
      let option_title = this.left_title_data;
      let grid_top = 2;
      //grid数组，命名后面加S，其他数组同理
      let grid_arr = new Array();
      let xAxis_arr = new Array();
      let yAxis_arr = new Array();
      let series_arr = new Array();
      for (var i = 0; i < 7; i++) {
        //文件的全名
        let fullName = option_key + option_title[i];
        // 有些文件前面是4个0，判断全名是否为undi，是就增加一个0
        if (typeof option_echart_data.get(fullName) == "undefined") {
          fullName = "0" + fullName;
        }
        let grid_temp = {
          left: "5%",
          right: 0,
          height: "10%",
          top: grid_top + "%",
        };
        grid_arr.push(grid_temp);
        //grid_top值每次+14
        grid_top = grid_top + 14.3;

        //创建临时xAxis
        let xAxis_temp = {
          gridIndex: i,
          type: "category",
          axisLine: false,
          data: this.categoryNumberHz(this.hz_num[i]),
        };
        xAxis_arr.push(xAxis_temp);

        //创建临时yAxis
        let yAxis_temp = {
          gridIndex: i,
          type: "value",
          offset: 10,
          min: -(this.unit_number[i] / 2),
          max: this.unit_number[i] / 2,
          // axisLine: false,
          splitLine: false,
          // Y轴name
          name: this.unit_number[i] + "μV",
          nameTextStyle: {
            color: "#A3A3A3",
            fontWeight: 100,
            fontSize: 12,
          },
          nameLocation: "middle",
          nameGap: 10,
          nameRotate: 0,
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A3A3A3",
            },
          },
          scale: true,
        };
        yAxis_arr.push(yAxis_temp);
        //创建临时series
        let series_temp = {
          type: "line",
          xAxisIndex: i,
          yAxisIndex: i,
          showSymbol: false,
          data: option_echart_data.get(fullName),
          itemStyle: {
            normal: {
              lineStyle: {
                color: this.$datas.mark_color[i],
              },
            },
          },
        };
        series_arr.push(series_temp);
      }
      // 增加底色
      let grid_color = {
        left: "5%",
        right: 0,
        height: "100%",
        width: "95%",
        top: 0,
        show: true,
        backgroundColor: "#525252",
      };
      grid_arr.push(grid_color);
      // 放大缩小功能
      let dataZoom_arr = [
        {
          type: "inside",
          // realtime: true,
          start: 0,
          end: 100,
          minSpan: 10,
          xAxisIndex: [0, 1, 2, 3, 4, 5, 6, 7],
        },
      ];

      // test
      let xAxis_temp = {
        gridIndex: 7,
        type: "category",
        // axisLine: false,
        data: this.categoryNumber(),
        // inverse: false,
        position: "top",
        axisLine: {
          onZero: false,
        },
        axisTick: {
          show: true,
          interval: 500,
          inside: true,
          length: 10,
          lineStyle: {
            color: "#979797",
          },
        },
        splitLine: {
          show: true,
          interval: 500,
          lineStyle: {
            type: "dashed",
            color: "#979797",
          },
        },
        boundaryGap: false,
      };
      xAxis_arr.push(xAxis_temp);

      let yAxis_temp = {
        gridIndex: 7,
        type: "value",
        offset: 0,
        // axisLine: false,
        splitLine: false,

        scale: false,
      };
      yAxis_arr.push(yAxis_temp);

      return {
        grid: grid_arr,
        xAxis: xAxis_arr,
        yAxis: yAxis_arr,
        series: series_arr,
        dataZoom: dataZoom_arr,
      };
    },
    categoryNumber() {
      var filled = Array.from(Array(3000), (v, k) => k + 1);
      return filled;
    },
    // 100HZ的点数是3000，按照开放的Hz值来动态设置通道的点数
    categoryNumberHz(e) {
      var filled = Array.from(Array(30 * e), (v, k) => k + 1);
      return filled;
    },
    contro_shade() {
      var temp_on_off = this.on_off;
      if (temp_on_off == 0){
        this.on_off = 1;
      }else {
        this.on_off = 0;
      }

    }
  },
};
</script>

<style>
.l-mian {
  width: 100%;
  height: 67vh;
  display: flex;
  justify-content: space-between;
}
.l-left {
  width: 13%;
  display: flex;
  flex-direction: column;
}
/* .thin-line {
  display: inline-block;
  width: 1%;
  background-color: #FF525252;
  height: 4.78vh;
  left: 24%;
  margin-top: 4.8vh;
  vertical-align: top;
  margin-left: -1%;
  margin-right: 10%;
} */
.l-right {
  width: 87%;
  height: 67vh;
}
.left-title {
  width: 100%;
  height: 9.57vh;
  line-height: 9.57vh;
  font-size: 2vh;
  padding-left: 10%;
}
.line-point {
  display: inline-block;
  width: 0.5vh;
  height: 0.5vh;
  margin: 0 10%;
  background-color: #006ed1;
  vertical-align: middle;
}
.l-float {
  position: absolute;
  width: 10%;
  z-index: 999;
}
.float-bottom {
  width: 10%;
  border: none;
  outline: none;
  background-color: transparent;
}
.float-shade {
  width: 100%;
  height: 9.57vh;
  background-color: #ffffff;
  font-size: 1.5vh;
  text-align:right;
}
.shade-input {
  width: 30%;
}
.float-button {
  float: right;
}
</style>
