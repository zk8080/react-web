// 路由
import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import routerConfig from './routerConfig';
//路由按需加载
import loadComponent from './loadable';

/**
 * webpackChunkName: webpack按需加在打包时的chunk名字
 */

//404
const NoMatch = loadComponent(() => import(/* webpackChunkName: "404" */ '@container/error/404.component'));

const Index = () => (
    <Switch>
        <Route path='/' exact render={() => <Redirect to='/home/index'/>}/>
        {
            routerConfig.map((route, index) => {
                return <Route
                    key={index}
                    {...route}
                />;
            })
        }
        <Route component={NoMatch}/>
    </Switch>    
);

export default Index;
