<template>
  <div class="r-main">
    <div class="ri-label">
      <input
        type="file"
        id="get_files_botton"
        ref="get_files_botton"
        @change="get_files"
        hidden
        webkitdirectory
      />
      <label class="file_label" @click="$refs.get_files_botton.click()">{{
        file_msg
      }}</label>
      <input
        type="text"
        class="input_number"
        placeholder="输入项数"
        v-model="item_number"
      />
      <div class="up_down_box">
        <label class="up" @click="up">▲</label>
        <label class="down" @click="under">▼</label>
      </div>
      <select class="ri-algorithm" v-model="select_value">
        <option :value="''" selected>选择相应算法</option>
        <option v-for="(v, i) in algorithm_data" :value="v[1]" :key="i">{{
          v[0]
        }}</option>
      </select>
      <label class="ri-algorithm-run" @click="get_select_value()">启动</label>
    </div>
    <div class="ri-numbers" :style="{ color: font_colors[font_color_mark] }">
      系统已计算 {{ items_groups }}组数据，准确率为
      <span>{{ count_result }}%</span>
    </div>
    <div class="ri-compare">
      <div :style="{ color: font_colors[font_color_mark + 2] }">
        # 已知标签&分类结果 #
      </div>
      <table>
        <tr>
          <td
            v-for="(count, i) in 5"
            :key="i"
            :style="[
              { backgroundColor: i == 2 ? '#444549' : '' },
              { color: i == 2 ? '#fff' : '' },
            ]"
          >
            <!-- {{ known_result[count + Number(item_number) - 4] }} -->
            {{
              num_label_relation.get(
                Number(known_result[count + Number(item_number) - 4])
              )
            }}
          </td>
        </tr>
        <tr>
          <td
            v-for="(count, i) in 5"
            :key="i"
            :style="[
              {
                backgroundColor:
                  known_result[count + Number(item_number) - 4] !=
                  sort_label[count + Number(item_number) - 4]
                    ? '#BB485A'
                    : i == 2
                    ? '#444549'
                    : '',
              },
              { color: i == 2 ? '#fff' : '' },
            ]"
          >
            <!-- {{ sort_label[count + Number(item_number) - 4] }} -->
            {{
              num_label_relation.get(
                Number(sort_label[count + Number(item_number) - 4])
              )
            }}
          </td>
        </tr>
      </table>
    </div>
    <div class="ri-statis">
      <div :style="{ color: font_colors[font_color_mark + 2] }">
        # 统计结果 #
      </div>
      <table cellspacing="0">
        <tr v-for="(trCount, tri) in 6" :key="tri">
          <td
            v-for="(tdCount, tdi) in 7"
            :key="tdi"
            :style="[
              { backgroundColor: tri == 0 || tdi == 0 ? '#444549' : '' },
              {
                borderBottom:
                  tri == 0
                    ? '0.2vh solid #FFF'
                    : tdi != 0 && tri != 5
                    ? '0.1vh solid #FFF'
                    : '',
              },
              {
                borderRight:
                  tdi == 0
                    ? '0.2vh solid #FFF'
                    : tri != 0 && tdi != 6
                    ? '0.1vh solid #FFF'
                    : '',
              },
              { color: tri == 0 || tdi == 0 ? '#FFF' : '' },
            ]"
          >
            <!-- {{
              tri == 0
                ? num_label_relation.get(tdi + 1)
                : tdi == 0
                ? num_label_relation.get(tri + 1)
                : statis_result.get(tri + 1 + "" + (tdi + 1))
            }} -->

            {{
              tri == 0
                ? statistical_results_title[tdi]
                : tdi == 0
                ? statistical_results_title[tri]
                : statis_result.get(7 - Number(tri) + "" + (7 - Number(tdi)))
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ERight",
  data() {
    return {
      file_msg: "✔ 选择目录",
      files_resource_map: new Map(), //读取目录中的文件map
      item_number: "", //项数
      known_result: new Array(), //已知结果
      sort_label: new Array(), //分类标签
      final_results: new Map(), //最终数据
      items_groups: 0, // 数组的组数
      num_label_relation: new Map(), //数字与标签的关系
      statis_result: new Map(), //统计结果
      font_colors: ["#3c3c3c", "#FFFFFF", "#3C3C3C", "#969696"], //文字颜色
      algorithm_data: this.$datas.algorithms, //算法数组
      select_value: "", //下拉框默认值
      file_path: "", // 目录名称
      count_result: "--", //总的计算结果
      statistical_results_title: ["", "SW", "REM", "S1", "S2", "SS", "ACC"], //统计结果表格的表头,
      
    };
  },
  props: {
    font_color_mark: Number,
  },
  mounted() {
    this.font_color_mark = 0;
  },
  created: function() {
    this.init_relation();
  },
  methods: {
    recursion(e, i) {
      return new Promise((resolve) => {
        var reader = new FileReader();
        reader.readAsText(e[i]); //读取文件的内容
        reader.onload = function() {
          // console.log(Object.prototype.toString.call(this.result) ); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
          const snsArr = this.result.split(/[(\r\n)\r\n]+/);
          snsArr.forEach((item, index) => {
            if (!item) {
              snsArr.splice(index, 1); //删除空项
            }
          });
          let map_temp = new Array();
          map_temp.push(e[i].name.replace(".dat", ""));
          map_temp.push(snsArr);
          resolve(map_temp);
        };
      });
    },
    async get_files() {
      //获取目录中的文件数据
      let files_source_temp = this.$refs.get_files_botton.files;
      //提取目录
      let file_path_index_temp = files_source_temp[0].webkitRelativePath.lastIndexOf(
        "/"
      );
      let file_path_temp = files_source_temp[0].webkitRelativePath.substring(
        0,
        file_path_index_temp
      );
      //目录赋值给常量
      this.file_path = file_path_temp;
      this.clean_const();

      //读取文件内容，并复制给常量
      for (let i = 0; i < files_source_temp.length; i++) {
        const result_temp = await this.recursion(files_source_temp, i);
        this.files_resource_map.set(result_temp[0], result_temp[1]);
      }
      //赋值
      this.assignment();
    },
    up() {
      if (this.item_number == "") {
        alert("请选择目录");
      } else if (this.item_number < this.items_groups) {
        this.item_number = Number(this.item_number) + 1;
        // resources.set("item_number", this.item_number);
        // this.$emit("resources", resources);
      }else {
        alert('最多只有 ' + this.items_groups + ' 组数据！！！');
      }
    },
    under() {
      if (this.item_number == "") {
        alert("请选择目录");
      } else if (Number(this.item_number) != 1) {
        this.item_number = Number(this.item_number) - 1;
        // resources.set("item_number", this.item_number);
        // this.$emit("resources", resources);
      }
    },
    //清空常量
    clean_const() {
      //清空文件值常量 files_resource_map
      this.files_resource_map = new Map();
      this.known_result = new Array();
      this.sort_label = new Array();
      this.final_results = new Map();
      this.item_number = "";
    },
    //给已知结果、分类标签，数据分类赋值
    assignment() {
      // 老代码 20201231前
      // this.known_result = this.files_resource_map.get(this.$datas.known_result);
      // 已知结果。结果1要加1
      let temp_known_result_array = this.files_resource_map.get(
        this.$datas.known_result
      );
      // 遍历
      let temp_known_result_fotEach = new Array();
      temp_known_result_array.forEach(function(value) {
        if (value == "1") {
          temp_known_result_fotEach.push((Number(value) + 1).toString());
        } else {
          temp_known_result_fotEach.push(value);
        }
      });
      this.known_result = temp_known_result_fotEach;
      //遍历文件数据 files_resource_map
      //创建一个map，接收遍历后的数据
      let temp_resource_map = new Map();
      // 标签名
      let temp_marks = this.$datas.mark_7;
      console.log(this.$datas.mark_7);
      this.files_resource_map.forEach(function(value, key) {
        // 获取文件名前四位字符 老代码 20201231 前
        // let temp_key = Number(key.substring(0, 4));
        let temp_key = key;
        temp_marks.forEach(function(mark_value) {
          temp_key = temp_key.replace(mark_value, '');
        });
        temp_key = Number(temp_key);
        //判断字符是否为数字
        if (!isNaN(temp_key)) {
          //同组数据前四位字符都是同样的数值，且转成数字后可作排序，将此数字作为key，value为同组数据的map,一起存入大map中，再将key作为存入数组的先后顺序，自此，项数就可以对应组数
          //将数字作为Key,查看temp_resource_map中是否存在
          // if(typeof(temp_resource_map.get(temp_key.toString())) == "undefined"){
          if (!temp_resource_map.has(temp_key.toString())) {
            let temp_map = new Map();
            temp_map.set(key, value);
            temp_resource_map.set(temp_key.toString(), temp_map);
          } else {
            temp_resource_map.get(temp_key.toString()).set(key, value);
          }
        }
      });
      this.final_results = temp_resource_map;
      //记录组数
      let temp_number = 0;
      temp_resource_map.forEach(function() {
        temp_number++;
      });
      this.items_groups = temp_number;

      //给组数赋值
      //给项数赋值,因为在监听项数的变化，所以只能等最终值都赋完后才能给初始化项数
      this.item_number = 1;
    },
    //初始化 数字-标签对应关系,6-SW,5-REM,4-S1,3-S2,2-SS。
    init_relation() {
      this.num_label_relation.set(2, "SS");
      this.num_label_relation.set(3, "S2");
      this.num_label_relation.set(4, "S1");
      this.num_label_relation.set(5, "REM");
      this.num_label_relation.set(6, "SW");
      this.num_label_relation.set(7, "ACC");
    },
    //计算统计结果
    count_statis_result() {
      let count_label = this.sort_label; //接收标签
      let count_sort = new Map(); //赋值给统计结果map
      //遍历已知结果
      this.known_result.forEach(function(value, i) {
        //因为每个标签所对应的数值是唯一的，将已知结果、分类标签的数值以字符串形式相加，作为map的key，可对应统计结果
        //提取分类标签的值
        let temp_value = count_label[i];
        let temp_key = value + temp_value;
        //判断是否存入map，有的话，数字相加，没有就存入
        if (count_sort.has(temp_key)) {
          count_sort.set(temp_key, count_sort.get(temp_key) + 1);
        } else {
          count_sort.set(temp_key, 1);
        }
      });

      // 全局总数
      let global_total = 0;
      // 正确总数
      let correct_total = 0;

      // 计算百分比
      for (var j = 2; j <= 6; j++) {
        //分子：结果和标签都能对上
        let numerator = 0;
        //分母：当前分类的总数
        let total = 0;
        for (var k = 2; k <= 6; k++) {
          let temp_count = count_sort.get(j.toString() + k.toString());
          // 每种类型的数量
          if (!isNaN(temp_count)) {
            total += temp_count;
          }
          //正确值的数量
          if (j == k && !isNaN(temp_count)) {
            //每种类型正确的数量
            numerator = count_sort.get(j.toString() + k.toString());
            //全部正确值的数量
            correct_total += numerator;
          }
        }
        //相加全部数量
        global_total += total;
        //计算
        let count = (Math.round((numerator / total) * 10000) / 100.0).toFixed(
          0
        );
        // 设置每种类型的正确路
        count_sort.set(j.toString() + 1, count);
      }
      // 统计结果赋值
      this.statis_result = count_sort;
      // 计算全局正确率
      this.count_result = (
        Math.round((correct_total / global_total) * 10000) / 100.0
      ).toFixed(2);
    },
    get_select_value() {
      if (this.select_value == "") {
        alert("请选择算法！");
      } else if (this.known_result.length == 0) {
        alert("请选择目录！");
      } else if (
        typeof this.files_resource_map.get(this.select_value) == "undefined"
      ) {
        alert("此算法对应的文件不存在！");
      } else {
        //分类标签.老代码 20201231前
        // this.sort_label = this.files_resource_map.get(this.select_value);
        //分类标签，每个值+1
        let temp_sort_label = this.files_resource_map.get(this.select_value);
        let temp_sort_label_forEach = new Array();
        temp_sort_label.forEach(function(value) {
          temp_sort_label_forEach.push((Number(value) + 1).toString());
        });
        //赋值
        this.sort_label = temp_sort_label_forEach;

        //计算统计结果
        this.count_statis_result();
        this.$emit("r_sort_label", this.sort_label);
      }
    },
  },
  watch: {
    // 检测项数值是否变化
    item_number: {
      deep: true,
      handler(newValue) {
        let echart_value = this.final_results.get(newValue.toString());
        if (typeof echart_value != "undefined") {
          echart_value.set("echart_key", newValue);
          this.$emit("r_echart", echart_value);
          this.$emit("r_known_label", this.known_result);
        }
      },
    },
    // file_path: {
    //   deep: true,
    //   handler() {
    //     if (this.known_result.length != 0) {
    //       console.log(this.known_result);
    //       this.$emit("r_known_label", this.known_result);
    //     }
    //   },
    // },
  },
};
</script>

<style>
.r-main {
  width: 90%;
  height: 83vh;
  padding: 5vh 5%;
  /* background-color: crimson; */
  font-size: 1.5vh;
  color: rgba(60, 60, 60, 1);
}
.ri-label {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 2px solid rgba(101, 103, 106, 1);
}
.file_label {
  background-color: rgba(204, 204, 204, 1);
  width: 35%;
  height: 5vh;
  text-align: center;
  line-height: 5vh;
  border-radius: 0.5vh;
}
.input_number {
  background-color: rgba(204, 204, 204, 1);
  width: 30%;
  height: 5vh;
  border: 0;
  padding: 0 0 0 5%;
  outline: none;
  border-radius: 0.5vh 0 0 0.5vh;
  margin-left: 5%;
}
.up_down_box {
  width: 24%;
  height: 5vh;
  margin-left: 1px;
  padding: 0;
  position: relative;
}
.up,
.down {
  background-color: #96d700;
  display: inline-block;
  width: 100%;
  height: 2.5vh;
  text-align: center;
  line-height: 2.5vh;
  position: absolute;
}
.up {
  border-radius: 0 0.5vh 0 0;
}
.down {
  /* margin-top: 2.5vh; */
  border-radius: 0 0 0.5vh 0;
  bottom: 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
}
.ri-algorithm {
  width: 75%;
  height: 5vh;
  border-radius: 0.5vh 0 0 0.5vh;
  border: 0;
  background-color: rgba(204, 204, 204, 1);
  margin: 3vh 0 5vh 0;
  outline: none;
}
.ri-algorithm-run {
  width: 24%;
  margin-left: 1px;
  height: 5vh;
  margin-top: 3vh;
  text-align: center;
  background-color: #96d700;
  line-height: 5vh;
  border-radius: 0 0.5vh 0.5vh 0;
}

.ri-numbers {
  width: 100%;
  font-size: 2.8vh;
  margin: 4vh 0;
}
.ri-numbers span {
  color: #96d700;
}
.ri-compare table {
  width: 100%;
  margin: 2.5vh 0;
}
.ri-compare table tr td {
  width: 20%;
  height: 5vh;
  background-color: #cccccc;
  text-align: center;
}
.ri-statis table {
  width: 100%;
  margin: 2.5vh 0;
}
.ri-statis table tr td {
  width: 14%;
  height: 4.5vh;
  background-color: #65676a;
  text-align: center;
  color: #fff;
}
</style>
