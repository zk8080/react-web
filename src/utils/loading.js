import React from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';

function loading () {
    const div = document.createElement('div');
    div.className = 'request-loading hideLoading';
    document.body.appendChild(div);
    ReactDOM.render(<ReactLoading 
        type='spinningBubbles' 
        color="#1890ff"
        height={128}
        width={128}
    />, div);
    return {
        showLoading: () => {
            div.className = 'request-loading showLoading';
        },
        hideLoading: () => {
            div.className = 'request-loading hideLoading';
        }
    };
}

export default new loading();

