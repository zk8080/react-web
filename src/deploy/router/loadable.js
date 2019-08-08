// 按需加载路由
import React from 'react';
import Loadable from 'react-loadable';
import {Spin} from 'antd';

function Loading(props) {
    console.log(props, '---props---');
    if (props.error) {
        // return <div>Error! </div>;
    } else if (props.timedOut) {
        // return <div>Taking a long time... </div>;
    } else if (props.pastDelay) {
        return <div className="root-loading"><Spin></Spin></div>;
    } else {
        return null;
    }
}

const loadComponent = (com) => {
    return Loadable({
        loader: com,
        loading: Loading
    });
};

export default loadComponent;
