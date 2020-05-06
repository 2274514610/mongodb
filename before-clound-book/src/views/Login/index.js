import React from 'react'
import './index.scss'
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import Cookies from 'js-cookie'
import axios from 'axios'  //登录请求时,要使用原生的axios
import api from '../../Utils/api'
import {connect} from 'react-redux'

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    //校检用户名
    checkUsername = (rule, value, callback) => {
        // let phone = value.replace(/\s/g, "");  //去除空格
        let phone = value.trim();  //去除空格
        //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、    176~178。14号段为上网卡专属号段
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (!value) {
            callback([new Error('用户名不能为空')]);
        } else {
            if (!regs.test(phone)) {
                callback([new Error('手机号输入不合法')])
            } else {
                callback()
            }
        }
    };
    //校检密码
    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback([new Error('请输入您的密码')])
        } else {
            callback()
        }
    };
    //登录
    handleLogin = values => {
        // console.log('接收到的表单值:', values);
        let params = {phone: values.username, password: values.password}
        // axios.post('/api/user/login', params).then(res => {
        axios.post(api.login, params).then(res => {
            console.log(res);
            if (res.data.code === 200) {
                let userObj = res.data.data;
                // console.log(typeof userObj);
                let userJsonStr = JSON.stringify(userObj);
                // console.log(typeof userJsonStr)
                Cookies.set('user', userJsonStr)   //将token存储起来
                //修改登录状态
                // this.props.changeLoginState(true);
                this.props.changeLoginState({loginState: true,userName: values.username});
                //跳转到对应页面  不需要回退用replace
                console.log(this.props,6666)
                let {from} = this.props.location.state || {from: {pathname: '/'}};
                this.props.history.push(from.pathname)
            } else {
                message.error(res.data.msg)
            }
        }).catch(err => console.log(err))
    };

    render() {
        return (
            <div className='login_page'>
                <div className="login_box">
                    <div className="header_box">
                        <h1 style={{minWidth: '300px'}}>云书后台管理系统</h1>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.handleLogin}
                    >
                        <FormItem
                            name="username"
                            rules={[{required: true, validator: this.checkUsername}]}
                        >
                            <Input size='large' style={{minWidth: '300px'}}
                                   prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </FormItem>
                        <FormItem
                            name="password"
                            rules={[{required: true, validator: this.checkPassword}]}
                        >
                            <Input
                                size='large'
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                                style={{minWidth: '300px'}}
                            />
                        </FormItem>
                        <FormItem>
                            <FormItem name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{color: '#fff', minWidth: '200px'}}>Remember me</Checkbox>
                            </FormItem>
                        </FormItem>

                        <Form.Item style={{textAlign: 'center'}}>
                            <Button type="primary" style={{width: '40%', minWidth: '100px'}} size='large'
                                    htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
const mapActionToProps = dispatch => {
    return {
        changeLoginState: newState => {
            dispatch({type: 'CHANGE_LOGIN_STATE',payload: newState})
        }
    }
};

export default connect(null,mapActionToProps)(Login)

// export default Login