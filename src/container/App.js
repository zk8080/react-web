import React from 'react';
import './App.less';
import Silder from './main/silder/index.component';
import Header from './main/header/index.component';
import RouterComponent from '@deploy/router/router';
import {
    BrowserRouter as Router
} from 'react-router-dom'
import {Provider} from 'mobx-react';
import '@deploy/axios';
import appStore from '@deploy/store';

const Store = {appStore};

function App() {
    return (
        <Provider {...Store}>
            <div className="App">
                <Router>
                    <Header></Header>
                    <div className='container'>
                        <Silder></Silder> 
                        <div className='main'> 
                            <RouterComponent></RouterComponent>
                        </div>
                    </div>  
                </Router>   
            </div>
        </Provider>
    );
}

export default App;
