import React from 'react'
import './index.scss'
import MainContent from "./MainContent";
import SideMenu from "./SideMenu";
import TopHeader from "./TopHeader";
import {Layout} from 'antd'
const {Sider,Footer} = Layout;


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    };
    render() {
        return (
            <Layout className="admin_box">
                <Sider><SideMenu /></Sider>
                <Layout>
                    <TopHeader history={this.props.history} />
                    <MainContent />
                    <Footer className='admin_footer' style={{textAlign:'center'}}>云书项目-后台管理系统</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Admin;