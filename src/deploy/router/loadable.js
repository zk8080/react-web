// 按需加载路由
import React from 'react';
import Loadable from 'react-loadable';
import {Spin} from 'antd';

function Loading() {
    return <div className="root-loading"><Spin></Spin></div>;
}

const loadComponent = (com) => {
    return Loadable({
        loader: com,
        loading: Loading
    });
};

export default loadComponent;
