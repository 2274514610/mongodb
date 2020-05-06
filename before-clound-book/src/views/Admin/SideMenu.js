import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Menu} from 'antd'
import {menus} from '../../router/menus'

const {SubMenu} = Menu;
let MenuItem = Menu.Item;

/*
* 左侧导航组件
* */
class SideMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    //递归渲染菜单
    renderMenu = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu
                    key = {item.path}
                    title = {
                        <span>
                            {item.icon}
                            <span>{item.title}</span>
                        </span>
                    }
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <MenuItem key={item.path}>
                   <Link to={item.path}>
                       {item.icon}
                       <span>{item.title}</span>
                   </Link>
                </MenuItem>
            )
        })
    };

    urlToList(url) {
        const urlList = url.split('/').filter(i => i);
        return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`)
    }

    render() {
        const menuSelected = this.props.history.location.pathname;
        const menuOpenedArray = this.urlToList(menuSelected).slice(0, -1);
        console.log(menuSelected, 'menuSelected');
        console.log(menuOpenedArray, 'menuOpenedArray')
        return (
            <div className="sideMenu_box">
                <Link to='/' className='sideMenu_header'>
                    <h1>云书后台系统</h1>
                </Link>
                <Menu
                    //初始展开的 SubMenu菜单项 key数组
                    defaultOpenKeys={menuOpenedArray}
                    //初始选中的菜单项 key 数组
                    defaultSelectedKeys={menuSelected}
                    //当前选中的菜单项 key 数组
                    selectedKeys={[menuSelected]}
                    mode='inline'
                    //主题颜色
                    theme='dark'
                >
                    {this.renderMenu(menus)}
                </Menu>
            </div>
        )
    }
};

export default withRouter(SideMenu)