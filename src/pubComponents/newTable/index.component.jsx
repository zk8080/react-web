import React, { Component } from 'react';
import {Table, Popover} from 'antd';
import './index.less';
import { toJS } from 'mobx';
import ResizeableTitle from './utils';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            columns: [],
            scroll: {x: 1000, y:500},
            firstX: 0 
        }
    }


    componentDidMount() {
        // 设置columns
        const arr = toJS(this.props.columns || []);
        this.setState({
            columns: arr,
            scroll: this.props.scroll || {x: 1000, y:500}
        });
    }

    components = {
        header: {
          cell: ResizeableTitle,
        },
    };

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            // 获取当前调整列之前的width
            const currentWidth = nextColumns[index].width;
            // 获取调整之后的width，做比较
            const newWidth = size.width;
            // 比较调整前后的变化
            const diffWidth = newWidth - currentWidth;
            
            // 设置新的scroll
            const x = this.state.scroll.x;
            const y = this.state.scroll.y;

            // 设置新的columns
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };

            return { 
                columns: nextColumns,
                scroll: {
                    x: x + diffWidth,
                    y: y
                }
            };
        });
    };


    handleTableChange = (pagination) => {
        // 有分页的时候，分页发生变化才需要重新查询数据
        if(this.props.pagination){
            const pageParams = { 
                current: pagination.current,
                pageSize: pagination.pageSize
            };
            this.props.getQueryData && this.props.getQueryData(pageParams);
        }
    };

    render() {
        const colm = toJS(this.state.columns || []);
        const columns = colm.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));
        return (
            <Table
                rowKey={(v, i) => i}
                bordered
                {...this.props}
                className={`cur-table ${this.props.className}`}
                onChange={this.handleTableChange}
                columns={columns}
                components={this.components}
                scroll={this.state.scroll}
            />
        );
    }
}


export default Index;