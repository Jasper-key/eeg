<template>
  <div class="t-main">
    <div class="t-logo">
      <img src="./../assets/logo.png" />
      <span>｜睡眠分期自动判读系统</span>
    </div>
    <div class="t-botton">
      <input
        class="switch switch-anim"
        type="checkbox"
        @click="t_switch_click"
        checked
      />
      <span>{{ t_switch }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ETitle",
  data() {
    return {
      t_switch: "浅色模式",
      t_switch_mark: 0,
    };
  },
  methods: {
    t_switch_click() {
      switch (this.t_switch_mark) {
        case 0:
          this.t_switch = "深色模式";
          this.t_switch_mark = 1;
          break;
        case 1:
          this.t_switch = "浅色模式";
          this.t_switch_mark = 0;
          break;
        default:
          break;
      }
      this.$emit("color_switch", this.t_switch_mark);
    },
  },
};
</script>

<style scoped>
.t-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  padding: 0 2%;
  justify-content: space-between;
  border-bottom: 1px solid rgb(172, 172, 172);
}
.t-logo img {
  height: 5vh;
  vertical-align: middle;
}
.t-logo span {
  font-size: 3vh;
  font-weight: 600;
}
.t-botton {
  right: 1%;
}

.t-botton span {
  font-size: 2vh;
}
/* 开关 */
.switch {
  width: 8vh;
  height: 3.3vh;
  position: relative;
  border: 1px solid #64bd63;
  background-color: #64bd63;
  box-shadow: #64bd63 0 0 0 0 inset;
  border-radius: 3vh;
  /* background-clip: content-box; */
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
  vertical-align: middle;
}
.switch:before {
  content: "";
  width: 3vh;
  height: 3vh;
  position: absolute;
  top: 0.1vh;
  left: 60%;
  border-radius: 3vh;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.switch:checked {
  border-color: #dfdfdf;
  box-shadow: #dfdfdf 0 0 0 16px inset;
  background-color: #dfdfdf;
}
.switch:checked:before {
  left: 0px;
}
.switch.switch-anim {
  transition: border cubic-bezier(0, 0, 0, 1) 0.4s,
    box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
}
.switch.switch-anim:before {
  transition: left 0.3s;
}
.switch.switch-anim:checked {
  box-shadow: #dfdfdf 0 0 0 3vh inset;
  background-color: #dfdfdf;
  transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
}
.switch.switch-anim:checked:before {
  /* 1 */
  transition: left 0.3s;
}
</style>
