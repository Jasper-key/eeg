<template>
  <div class="b-main">
    <div class="b-title">
      <b>所有分类标签&nbsp;</b>
      <span class="one-line"></span>
      <div class="short-line"></div>
      <div class="vertical-line"></div>
      <div>
        <b>
          All
          <br />
          Category
          <br />
          Labels
        </b>
      </div>
    </div>
    <div class="b-echart" id="b-echart"></div>
  </div>
</template>

<script>
export default {
  name: "EBottom",
  data() {
    return {};
  },
  props: {
    b_known_data: Array,
    b_sort_data: Array,
  },
  mounted() {
    // this.drawEchart();
  },
  watch: {
    // 检测已知结果
    b_known_data: {
      deep: true,
      handler() {
        this.drawEchart();
      },
    },
    // 检测分类标签
    b_sort_data: {
      deep: true,
      handler() {
        this.drawEchart();
      },
    },
  },
  methods: {
    drawEchart() {
      // 基于准备好的dom，初始化echarts实例
      let bChart = this.$echarts.init(document.getElementById("b-echart"));
      // 绘制图表
      bChart.setOption({
        color: ["#96D700", "rgb(187, 72, 90)"],
        tooltip: {
          trigger: 'axis',
          formatter: '当前组数为：{b}'
        },
        legend: {
          type: "plain",
          itemHeight: 15,
          itemWidth: 15,
          data: [
            {
              name: "已知结果",
              icon: "rect",
              textStyle: {
                color: "#CACACA",
              },
            },
            {
              name: "分类标签",
              icon: "rect",
              textStyle: {
                color: "#CACACA",
              },
            },
          ],
        },
        dataZoom: [
          {
            type: "inside",
            // realtime: true,
            start: 0,
            end: 100,
            minSpan: 10,
          },
        ],
        grid: {
          top: 0,
          left: "5%",
          bottom: 0,
          height: "85%",
          width: "95%",
          show: true,
          backgroundColor: "#444549",
        },
        xAxis: {
          type: "category",
          data: this.countNumber(this.b_known_data.length),
          boundaryGap: false,
          name: "时间(h)",
          nameGap: 0,
          nameTextStyle: {
            padding: [0, 0, -25, -32],
            fontSize: 9,
          },
          axisTick: {
            inside: true,
          },
          axisLabel: {
            formatter: function(value) {
              return (value / 120).toFixed(2);
            },
            showMaxLabel: false,
            showMinLabel: false,
            interval: parseInt(this.b_known_data.length / 8),
          },
        },
        yAxis: {
          type: "value",
          min: 1,
          max: 7,
          axisLabel: {
            margin: 20,
            fontWeight: "bolder",
            color: "#6D7278",
            formatter: function(value) {
              let y_title_value = "";
              switch (value) {
                case 2:
                  y_title_value = "SS";
                  break;
                case 3:
                  y_title_value = "S2";
                  break;
                case 4:
                  y_title_value = "S1";
                  break;
                case 5:
                  y_title_value = "REM";
                  break;
                case 6:
                  y_title_value = "SW";
                  break;
              }
              return y_title_value;
            },
          },
          axisTick: {
            inside: true,
            lineStyle: {
              color: "#FFFFFF",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#979797",
            },
          },
        },
        series: [
          {
            name: "已知结果",
            data: this.b_known_data,
            type: "line",
            lineStyle: {
              color: "#96D700",
            },
            showSymbol: false,
          },
          {
            name: "分类标签",
            data: this.b_sort_data,
            type: "line",
            lineStyle: {
              color: "rgb(187, 72, 90)",
            },
            showSymbol: false,
          },
        ],
      });
    },
    countNumber(e) {
      var filled = Array.from(Array(e), (v, k) => k + 1);
      return filled;
    },
    //生成随机数
    mathNumber() {
      var tempNumber = [];
      for (var i = 0; i < 1800; i++) {
        var p = Math.floor(Math.random() * (6 - 2 + 1) + 2);
        tempNumber.push(p);
      }
      return tempNumber;
    },
  },
};
</script>

<style scoped>
.b-main {
  width: 100%;
  height: 26vh;
  display: flex;
  position: relative;
}

.b-title {
  width: 12%;
  height: 26vh;
  padding-left: 1%;
  color: #444549;
}
.b-echart {
  width: 87%;
  height: 26vh;
}
.one-line {
  display: inline-block;
  width: 15%;
  height: 1px;
  background-color: #444549;
  vertical-align: middle;
}
.short-line {
  width: 5%;
  height: 1px;
  margin: 2vh 0 1vh 2.5%;
  background-color: #444549;
}
.vertical-line {
  width: 1px;
  height: 7vh;
  margin-left: 5%;
  background-color: #444549;
}
</style>
