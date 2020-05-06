/*
* redux思路
* 大体思路：先创建store --> 注入store到应用程序 --> 组件获取store中state数据
* 1.需要从redux中引入createStore方法,创建store容器对象
* 2.因为createStore需要传递参数: reducers和中间件(暂且不考虑),所以需要创建reducers函数
* 3.创建reducers函数,它包含两个参数: state和action。 这个函数必须return一个全新的state
* 4.将创建成功的reducer函数放进createStore方法中
* */

//applyMiddleware 方法用于使用中间件
// import {createStore,applyMiddleware} from "redux";
import {createStore} from "redux";
import rootReducer from './reducers';

const initialState = sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')) : {};
console.log(initialState,3333 + 'store>index.js')

//利用createStore方法创建store容器对象
let store = createStore(rootReducer,initialState);
sessionStorage.removeItem('store')

export default store;