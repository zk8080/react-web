// 路由
import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
//路由按需加载
import loadComponent from './loadable';

//首页demo组件
const Home = loadComponent(() => import(/* webpackChunkName: "home" */ '@container/home/index.component'));

//用户管理
const UserList = loadComponent(() => import(/* webpackChunkName: "userList" */ '@container/userManager/userList/index.component'));
const AddUser = loadComponent(() => import(/* webpackChunkName: "addUser" */ '@container/userManager/addUser/index.component'));

//文章管理
const ArticleList = loadComponent(() => import(/* webpackChunkName: "articleList" */ '@container/articleManager/articleList/index.component'));
const AddArticle = loadComponent(() => import(/* webpackChunkName: "addArticle" */ '@container/articleManager/addArticle/index.component'));

//404
const NoMatch = loadComponent(() => import(/* webpackChunkName: "404" */ '@container/error/404.component'));

const Index = () => (
    <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/user/list' component={UserList}/>
        <Route path='/user/add' component={AddUser}/>
        <Route path='/article/list' component={ArticleList}/>
        <Route path='/article/add' component={AddArticle}/>
        <Route component={NoMatch}/>
    </Switch>    
);

export default Index;
