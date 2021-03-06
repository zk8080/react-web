import React, { Component } from 'react';
import {data} from './index.data';
import './index.less';

class Index extends Component {

    renderColumn = (arr) => {
        return arr.map((item, index) => {
            return (
                <div className={item.lastData == 0 ? 'column_box yellow': item.lastData != item.allData ?'column_box green':'column_box'} key={index}>
                    <div className='column'>
                        {item.basketNum}
                    </div>
                    <div className='all_data'>
                        <div>
                            <div>
                                <span>共：</span><span>{item.allData}</span>
                            </div>
                            <div>
                                <span>剩：</span><span>{item.lastData}</span>
                            </div>
                            
                        </div>
                        {/* <div className='last_data'>
                            剩余：<span>{item.lastData}</span>
                        </div> */}
                    </div>
                    
                </div>
            );
        });
    }

    render() {
        return (
            <div className='column_cont'>
                {
                    this.renderColumn(this.props.data)
                }
            </div>
        );
    }
}

export default Index;
