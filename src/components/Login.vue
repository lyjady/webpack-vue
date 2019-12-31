<template>
    <div>
        <h1>这是Login.vue的组件</h1>
        {{ this.message }}
        <button @click="show">点击</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Login.vue中的数据'
            }
        },
        methods: {
            show() {
                console.log('调用了Login.vue中的show()')
            }
        }
    }
</script>

<style scoped>

</style>