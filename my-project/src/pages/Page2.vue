<template>
    <Row>
        <i-Col span="12">
            <Rate show-text v-model="valueText"></Rate>
        </i-Col>
        <i-Col span="12">
            <Rate show-text allow-half v-model="valueCustomText">
                <span style="color: #f5a623">{{ valueCustomText }}</span>
            </Rate>
        </i-Col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                valueText: 3,
                valueCustomText: 3.8
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>