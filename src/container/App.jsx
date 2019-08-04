import React from 'react';
import './App.less';
import Silder from './main/silder/index.component';
import Header from './main/header/index.component';
import RouterComponent from '@deploy/router/router';
import Bread from './main/breadcrumb/index.component';

// 引入公用样式
import './common/css/header.component.less';
import './common/css/query.component.less';
import './common/css/table.component.less';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div className='container'>
                <Silder></Silder>
                <div className='main'>
                    <Bread></Bread>
                    <RouterComponent></RouterComponent>
                </div>
            </div>
        </div>
    );
}

export default App;
