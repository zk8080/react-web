import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class Index extends Component {
    render() {
        const optionArr = this.props.option || [];
        return (
            <Select
                {...this.props}
                allowClear
            >
                {
                    optionArr.map((item, index) => {
                        const value = this.props.valueCode ? item[this.props.valueCode] : Object.keys(item)[0];
                        const name = this.props.valueName ? item[this.props.valueName] : Object.values(item)[0];
                        return <Option key={Math.random()} value={value}>{name}</Option>;
                    })
                }
            </Select>
        );
    }
}

export default Index;