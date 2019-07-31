import React from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';

function loading () {
    const div = document.createElement('div');
    div.className = 'root-loading';
    document.body.appendChild(div);
    ReactDOM.render(<ReactLoading 
        type='spinningBubbles' 
        color="#1890ff"
        height={128}
        width={128}
    />, div);
    return {
        showLoading: () => {
            div.className = 'root-loading showLoading';
        },
        hideLoading: () => {
            div.className = 'root-loading hideLoading';
        }
    };
}

export default new loading();

