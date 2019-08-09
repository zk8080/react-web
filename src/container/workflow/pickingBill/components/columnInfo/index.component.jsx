import React, { Component } from 'react';
import {data} from './index.data';
import './index.less';

class Index extends Component {

    renderColumn = (arr) => {
        return arr.map((item, index) => {
            return (
                <div className={item.allData == item.scanningData ? 'column_box yellow': 'column_box'} key={index}>
                    <div className='column'>
                        {item.column}
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
                    this.renderColumn(data)
                }
            </div>
        );
    }
}

export default Index;
