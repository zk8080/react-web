// 按需加载路由
import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading...</div>
}

const loadComponent = (com) => {
    return Loadable({
        loader: com,
        loading: Loading
    })
}

export default loadComponent;
