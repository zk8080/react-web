import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class Index extends Component {
    render() {
        const optionArr = this.props.option || [];
        const {value, valueCode, valueName} = this.props;
        return (
            <Select
                {...this.props}
                value={value !== null && value !== undefined && !Array.isArray(value) ? String(value): value}
                allowClear
            >
                {
                    optionArr.map((item, index) => {
                        const value = item[valueCode].toString();
                        const name = `${item[valueName]}(${item.barCode})`;
                        return <Option key={Math.random()} value={value} att={item}>{name}</Option>;
                    })
                }
            </Select>
        );
    }
}

export default Index;