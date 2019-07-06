import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import loadsh from 'lodash';
import routerConfig from '@deploy/router/routerConfig.js';
import './index.less';
import {Icon} from 'antd';

// 获取url和name的键值队
const getBreadcrumbNameMap = (arr) => {
    const obj = {};
    arr.map(item => obj[`${item.path}`] = item.breadcrumbName);
    return obj;
};

// 删除菜单
const deleteMenu = (selectMenu, curUrl) => {
    let historyUrlData = [];
    // 获取历史页面数据
    if( sessionStorage.getItem('historyUrlData') ){
        historyUrlData = JSON.parse(sessionStorage.getItem('historyUrlData'));
    }
    const newHistoryUrlData = historyUrlData.filter(item => item.path !== selectMenu.path);
    sessionStorage.setItem('historyUrlData', JSON.stringify(newHistoryUrlData));
    if( selectMenu.path !== curUrl ){
        window.appHistory.push(curUrl);
    }else{
        const nextMenu = newHistoryUrlData[newHistoryUrlData.length - 1];
        if( nextMenu ){
            window.appHistory.push(nextMenu.path);
        }
    }
};

const Bread = withRouter((props) => {
    //location 为浏览器默认的api
    const { location } = props;
    const url = location.pathname;
    // 根据routerConfig获取对应的url和name
    const breadcrumbNameMap = getBreadcrumbNameMap(routerConfig);
    
    let historyUrlData = [];
    // 获取历史页面数据
    if( sessionStorage.getItem('historyUrlData') ){
        historyUrlData = JSON.parse(sessionStorage.getItem('historyUrlData'));
    }
    // const historyUrlData = sessionStorage.getItem
    let isIndex = false;
    if ( url === '/') {
        isIndex = true;
    }

    if( breadcrumbNameMap[url] ){
        if(!loadsh.find(historyUrlData, {path: url}) ) {
            historyUrlData.push({path: url, name: breadcrumbNameMap[url]});
        }
        sessionStorage.setItem('historyUrlData', JSON.stringify(historyUrlData));
    }
    
    return (
        isIndex ? null :
            <div className="breadcrumb-content">
                <ul>
                    {
                        historyUrlData.map(item => {
                            return (
                                <li key={item.path}>
                                    <NavLink to={item.path} activeClassName='active-tab'>{item.name}</NavLink>
                                    {
                                        historyUrlData.length > 1 && <Icon type="close" onClick={() => {deleteMenu(item, url);}} />
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
    );
});
  
export default Bread;
