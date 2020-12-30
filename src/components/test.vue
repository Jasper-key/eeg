<template>
    <div class="main">
        <div class="one">
            第一行
        </div>
        <div class="left">
            左边80%
        </div>
        <div class="right">
            右边20%
        </div>
        <div class="bottom">
            底部100%
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.main {
    display: flex;
    height: 100vh;
    flex-wrap: wrap;
    background-color: blueviolet;
}
.one {
    width: 100%;
    height: 10%;
    background-color: rgb(42, 165, 128);
}
.left {
    width: 80%;
    height: 30%;
    background-color: chartreuse;
}
.right {
    width: 20%;
    height: 30%;
    background-color: cornflowerblue;
}
.bottom {
    width: 100%;
    height: 60%;
    background-color: crimson;
}
</style>
