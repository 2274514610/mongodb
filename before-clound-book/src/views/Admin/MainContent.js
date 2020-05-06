import React from 'react'
import {Redirect,withRouter,Route,Switch} from 'react-router-dom'
import {routes} from '../../router/router'
import {Layout} from 'antd'
const {Content}  = Layout;

 class MainContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Content className= 'admin_content'>
                <Switch>
                    {routes.map(ele => <Route render={()=> <ele.component/>} key={ele.path} path={ele.path} />)}
                    <Redirect from='/' exact to='/home' />
                    <Redirect to='/404'/>
                </Switch>
            </Content>
        )
    }
}

export default withRouter(MainContent)