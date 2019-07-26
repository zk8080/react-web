import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import {
    Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {Provider} from 'mobx-react';
import '@deploy/axios';
import './mock/mock.js';
import appStore from '@deploy/store';
import loadComponent from '@deploy/router/loadable';
import { createBrowserHistory } from 'history';
import {session} from '@utils/index'; 
import zhCN from 'antd/es/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';

const history = createBrowserHistory();
const Store = {appStore};
//全局路由跳转对象
window.appHistory = history;

//登录页面
const Login = loadComponent(() => import('@container/login/index.component'));
appStore.setIsAuthority(session.getItem('isAuthority').login);

const ProvideRoute = ({component: Component, ...rest}) => {
    return <Route
        {...rest}
        render = {props => {
            return appStore.isAuthority ?  <Component {...props}/> : <Redirect to={{pathname: '/login'}}/>;          
        }}
    />;
};

const Index = () => {
    return (
        <LocaleProvider locale={zhCN}>
            <Provider {...Store}>
                <Router history={history}>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <ProvideRoute path='/' component={App}/>
                    </Switch>
                </Router>
            </Provider>
        </LocaleProvider>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
