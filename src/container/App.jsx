import React from 'react';
import './App.less';
import Silder from './main/silder/index.component';
import Header from './main/header/index.component';
import RouterComponent from '@deploy/router/router';



function App() {
    return (
        <div className="App">
            <Header></Header>
            <div className='container'>
                <Silder></Silder>
                <div className='main'>
                    <RouterComponent></RouterComponent>
                </div>
            </div>
        </div>
    );
}

export default App;
