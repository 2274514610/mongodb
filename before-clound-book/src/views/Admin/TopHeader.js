import React from 'react'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

class TopHeaders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        console.log(this.props,101010);
    }

    login_out = ()=> {
        //修改登录状态
        this.props.changeLoginState({loginState: false,username: ''});
        console.log(Cookies.get('user'), '未删除前');
        Cookies.remove('user');
        console.log(Cookies.get('user'),'删除后');
        this.props.history.push('/login')
    };
    render() {
        return (
            <div className="topHeader_box">
                <div className='title_wrapper'>
                    云书后台管理系统
                </div>
                <div className='user_wrapper'>
                    <p className='username_welcome'>欢迎你！{this.props.state.userModule.userName}</p>
                    <p className='login_out' onClick={this.login_out}>退出登录</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeLoginState: newState => {
            dispatch({type: 'CHANGE_LOGIN_STATE',payload: newState})
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(TopHeaders)
