# 一元夺宝 后台管理平台 前端界面


## 依赖说明

```` json
"devDependencies": {
  "babel-cli": "^6.16.0", // babel命令行工具
  "babel-core": "^6.17.0", // babel-core核心库
  "babel-eslint": "^7.0.0", // babel-eslint 让eslint可以检查符合babel代码的code es6,es7..
  "nodemon": "^1.10.2", // 自动监听js代码代表,重启服务
  "babel-loader": "^6.2.5", // webpack babel加载器
  "babel-plugin-transform-runtime": "^6.15.0", // webpack插件,动态的引入浏览器不支持的特性。替换助手函数,类似功能的还有babel-polyfill
  "babel-plugin-transform-decorators-legacy": // decorator特特性现在已经不被支持了, 想要基础使用decorators,必须安装它 .for babel6 that replicates the old decorator behavior from Babel 5.
  "babel-preset-es2015": "^6.14.0", // 让babel支持最新的ECMA2015标准,babel官网已经使用babel-preset-latest
  "babel-preset-latest": "^6.16.0", // 可以代替babel-preset-es2015,包含es2015,es2016,es2017的所有内容
  "babel-preset-stage-0": "^6.3.13" // 如果你要使用 ... , Async ES7的语法,就需要这个.0代表Strawman阶段,
  "babel-preset-react": "^6.16.0", // 使babel支持react
  "better-npm-run": "^0.0.11", //  加强NPM命令,在package.json中使用
  "babel-runtime": "^6.11.1" // 对es6的语法进行转换
  "css-loader": "^0.25.0", //  webpack css加载器
  "cssnano": "^3.7.4", // webpack使用,利用postcss,自动给css加上前缀,合并css,就是做一些css优化
  "eslint": "^3.8.0", //  eslint命令行工具
  "eslint-loader": "^1.5.0", // webpack eslint加载器
  "eslint-plugin-react": "^6.4.1", // eslint支持jsx
  "eslint-plugin-babel": "^3.3.0", // fixes/adds a few rules that work with ES7 and beyond features
  "eslint-plugin-promise": "^3.0.0",
  "eslint-config-standard": "^6.0.0", // 集合了eslint规则库
  "eslint-config-standard-react": "^4.0.0", // 集合了eslint规则库,包含react
  "eslint-plugin-standard": "^1.3.1", // eslint插件,配合上面两个使用
  "file-loader": "0.9.0", // webpack file加载器
  "html-webpack-plugin": "^2.22.0", // webpack 插件自动 生成index.html页面,自动填入引入样式 js
  "json-loader": "^0.5.4", // webpack json加载器
  "sass-loader": "^4.0.2", // webpack sass加载器
  "style-loader": "^0.13.1", // webpack style加载器
  "url-loader": "^0.5.7", // webpack url加载器
  "postcss-loader": "^0.13.0", // webpack postcss加载器
  "webpack": "^1.13.2", // webpack 命令行工具
  "webpack-dev-middleware": "^1.8.4", // webpack 开发服务器
  "webpack-hot-middleware": "^2.13.0" // webpack 代码热加载
  "redbox-react": "1.3.2", // redbox-react 插件把catch到的错误直接显示到页面上,就不用再打开控制台看了
},
"dependencies": {
  "cheerio": "^0.20.0", // 在nodejs上使用有着jQuery的功能
  "halogen": "0.2.0", //A collection of loading spinners with React.js
  "connect-history-api-fallback": "1.3.0", // 匹配资源，如果不匹配就可以重定向到指定地址。(常用于 SPA 开发)
  "cssnano": "^3.7.7",  // webpack cssnano 待研究
  "debug": "^2.2.0", // debug模块 用于输出debug信息,代替console,生产环境和开发环境通过参数控制是否的输出,在better-npm-run里面有体现
  "express": "^4.14.0", // web服务框架
  "imports-loader": "^0.6.5", // 将变量注入到模块的作用域中, 如果第三方模块依赖于像$这样的全局变量或窗口对象，这是特别有用
  "extract-text-webpack-plugin": "^1.0.1", // 如果我们希望样式通过 <link> 引入，而不是放在 <style> 标签内,就需要他
  "fs-extra": "^0.30.0", // 扩展fs模块
  "ip": "^1.1.3", // ip地址模块,只有一个地方使用了它
  "lodash": "^4.16.4", // 好用的js工具库
  "node-sass": // 一个提供给nodejs使用的sass库
  "moment": "^2.15.1", // 时间模块
  "normalize.css": "^4.1.1", // 重置掉该重置的样式，保留有用的 user agent 样式，同时进行一些 bug 的修复,在core.scss中使用
  "react": "^15.0.0", // react
  "react-dom": "^15.0.0", // react-dom
  "react-router": "2.8.1", // react 路由控制
  "react-redux": "^4.4.5", // 是 React 和 Redux 間的橋樑，使用 Provider、connect 去連結 store 和 React View。
  "redux-thunk": "^2.1.0", // 使action可以异步触发
  "rimraf": "^2.5.4", // 使用rm -rf ,window和linux命令不冲突
  "yargs": "6.0.0" // 扩展命令行参数
  "phantomjs-prebuilt":  "^2.1.12", // Webkit相关
},
````
