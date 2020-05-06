import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import 'normalize.css/normalize.css';   //引入初始化样式
import Router from './router';   //引入自己的路由文件
import './globalCss/init.css';   //引入自己的初始化样式

//银瑞Provider组件,在里面注入store
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}><Router/></Provider>,
    document.getElementById('root')
);





// ReactDOM.render(
//   <React.StrictMode>  //启用了严格模式
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
