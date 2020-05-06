import Home from '../views/Home'
import Category from '../views/Category'
import Goods from '../views/Goods'
import Error404 from "../views/Error/Error404";
import User from '../views/User';
import Role from '../views/Role';
import Charts from '../views/Charts'
import MenuOne from '../views/LevelMenu/MenuOne'
import MenuTwo from '../views/LevelMenu/MenuTwo'

export const routes = [
    {path: '/home',component: Home},
    {path: '/products/category',component: Category},
    {path: '/products/goods',component: Goods},
    {path: '/404',component: Error404},
    {path: '/user',component: User},
    {path: '/role',component: Role},
    {path: '/charts',component: Charts},
    {path: '/menu/level/submenu-1',component: MenuOne},
    {path: '/menu/level/submenu-2',component: MenuTwo},
];