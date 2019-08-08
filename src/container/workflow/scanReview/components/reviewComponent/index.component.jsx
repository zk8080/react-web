import React, { Component } from 'react';
import './index.less';
import ColumnInfo from '../columnInfo/index.component';
import PackageInfo from '../packageInfo/index.component';

class Index extends Component {

    render() {
        return (
            <div className='review'>
                <div className='column_info'>
                    <ColumnInfo
                        data={this.props.packageList}
                    />
                </div>
                <div className='package_info'>
                    <PackageInfo></PackageInfo>
                </div>
            </div>
        );
    }
}

export default Index;
