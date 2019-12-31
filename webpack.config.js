const path = require('path');
const webpack = require('webpack'); //启动热更新第二步
//导入在内存中生成html页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin');
//这个配置文件起始就是一个js文件,通过Node中的模块操作,向外暴露了一个配置对象

const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    //srcDir表示要打包的那个问价
    entry: path.join(__dirname, './src/main.js'),
    //输出文件的相关的配置
    output: {
        //指定打包好的文件输出到那个目录中
        path: path.join(__dirname, './dist'),
        //指定生成的文件名称
        filename: "bundle.js"
    },
    //第二种webpack-dev-server的配置参数
    devServer: {
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true //启动热更新第一步
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //new一个热更新的模块对象,热更新的第三步
        //创建一个在内存中生成html页面的插件
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板页面,根据这个页面生成内存中的页面
            filename: "index.html" //指定生成页面的名称
        }),
        new vueLoaderPlugin()
    ],
    //这个节点用于配置所有的第三方加载器
    module: {
        rules: [
            //将css后缀的文件交给style-loader和css-loader进行处理
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            //添加less-loader与scss-loader使webpack对.less, .scss文件能够解析
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'scss=loader']},
            //将图片交给url-loader进行处理,如果默认进行这样的配置那么图片将是base64格式
            //如果想让图片变成普通的url格式进行引用那么设置limit参数将值设置成小于图片大小的值就行了
            //此时图片的名字是将图片内容进行Hash计算的结果如果不想进行Hash计算那么加上name=[name].[ext],说明使用图片原来的名称与扩展名
            //如果想区别同名图片可以在[name].[ext]前面加上[hash:8]-说明去Hash运算的前八位作为前缀然后用-进行拼接
            //为什么两个div中引用在不同文件夹下相同的名字的图片,后面的图片会覆盖前面的图片?
            //因为在页面中样式里的url内图片的引用是http://localhost:8080/xxx.jpg,说明生成的图片是在root目录下
            //那就说明了webpack会将css内引用的图片加载到内存中然后映射到root目录下,那么后面的图片会覆盖前面的人图片咋内存中.
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: "url-loader?limit=23222&name=[hash:8]-[name].[ext]"},
            //处理字体文件
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: "url-loader"},
            //将除node_modules外的js文件交个babel-loader解析
            {test: /\.js$/, use: "babel-loader", exclude: /node_modules/},
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    resolve: {
        //将vue结尾的路径映射成到dist/vue.js下
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }
};
//以后要重新打包只要直接输入指令webpack,会自动的读取配置文件中的配置进行打包