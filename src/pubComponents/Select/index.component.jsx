import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class Index extends Component {
    render() {
        const optionArr = this.props.option || [];
        const {value} = this.props;
        return (
            <Select
                {...this.props}
                value={value !== null && value !== undefined && !Array.isArray(value) ? String(value): value}
                allowClear
            >
                {
                    optionArr.map((item, index) => {
                        const value = this.props.valueCode ? item[this.props.valueCode].toString() : Object.keys(item)[0].toString();
                        const name = this.props.valueName ? item[this.props.valueName] : Object.values(item)[0];
                        return <Option key={Math.random()} value={value} att={item}>{name}</Option>;
                    })
                }
            </Select>
        );
    }
}

export default Index;