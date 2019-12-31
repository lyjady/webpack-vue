//导入Vue
//如果单单这样引入Vue,页面会无法运行.这个Vue提供的语法结构不完整只提供了runtime-only的方式,并没有提供向网页中的引用方式
//1.将Vue改成为vue/dist/vue.js这个完整的vus.js的位置
//2.修改vue中的package.json中main的路径指向vue.js
//3.修改配置文件,将vue映射成为dist/vue.js
import Vue from 'vue/dist/vue.runtime.common'
//导入自定义组件
import login from './components/Login.vue'

// const login = {
//     因为现在导入的是完整的vue.js, 所以显示没有问题, 但是如果使用runtime-only的话传统的形式无法使用
//     只能使用render
//     template: '<h1>这是Login组件(网页形式展示)</h1>'
// };

const app = new Vue({
    el: '#app',
    //render方式引用组件会替换app内的全部内容, 和v-text类似
    // render: function (createElement) {
    //     return createElement(login);
    // }
    //可简写成
    render: createElement => createElement(login)
});

//1.在webpack中使用vue:
//1.1.安装vue npm install vue -S
//1.2.导入vue import Vue from 'vue'(需要相关的配置将Vue指向vue.js)
//1.3.安装vue-loader vue-template-compiler vue-loader-plugin等插件
//1.4.在配置文件中使用插件({test: /\.vue$/, use: 'vue-loader'}, new VueLoaderPlugin)
//1.5.新建.vue后缀的组件, 在main.js中导入
//1.6.导入.vue组件
//-----------------------------------------------------------------------------
//2.在组件中定义自己的数据
//在script标签中使用export default {...}定义组件自己的数据, 定义方法和之前一样
//es6中导入使用import xxx from 'xxx' 导入使用export default {...} 和export
//export default {...}对外暴露一个对象,只能暴露一个, 接收名称可以自定义
//export 可以暴露多个变量, 接收只能import {xxx} from xxx, 名称必须和变量名一致(按需导出)
//node中导入使用module.require('xxx') 导出使用module.export('xxx')

//导入export default对象
import person from './js/text.js';
console.log(person);
//导入export 变量
import {name, age} from './js/text.js';
console.log(name + '---' + age);