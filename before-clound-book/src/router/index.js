import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from '../views/Login'   //引入登录组件
import Admin from '../views/Admin'
import AuthRouter from '../components/AuthRouter/index'

function App(props) {
    window.onbeforeunload = (e) => {
        console.log(props,7777+ 'router>index.js');
        sessionStorage.setItem('store', JSON.stringify(props.state));
    };
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <AuthRouter path='/' component={Admin}></AuthRouter></Switch>
        </Router>
    );
}
// 创建映射函数读取redux中保存用户登录状态
const mapStateToProps = (state) => {
    console.log(state,'fff + router>index');
    return {
        state
    }
}

// export default App;
export default connect(mapStateToProps)(App)


