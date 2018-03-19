
<template>
 <div> 
     <div class = "logo"></div>
    <Progress :percent="25"></Progress>
    <Progress :percent="45" status="active"></Progress>
    <Progress :percent="65" status="wrong"></Progress>
    <Progress :percent="100"></Progress>
    <Progress :percent="25" hide-info></Progress>
    <i-Circle
        :size="250"
        :trail-width="4"
        :stroke-width="5"
        :percent="75"
        stroke-linecap="square"
        stroke-color="#43a3fb">
        <div class="demo-Circle-custom">
            <h1>42,001,776</h1>
            <p>消费人群规模</p>
            <span>
                总占人数
                <i>75%</i>
            </span>
        </div>
    </i-Circle>
    dddddd
    
</div>
   
</template>
<script>
export default {



};
</script>
<style >
.logo{
    background-image: url("../assets/logo.png");
    background-size:100% 100%;
    width:100px;
    height:100px;
}
</style>