import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import { NewTable } from '@pubComs';
import colums from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form,Table} from 'antd';
import FormComponent from './components/formComponent/index.component';
import HeadComponent from './components/headComponent/index.component';
import ComfirmRestock from './components/confirmRestock/index.component';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        State.getTableList();
    }

    rowSelection = {
        onChange: (selectRowKeys, selectRows) => {
            console.log(selectRows,'selectRows', selectRowKeys, 'selectRowKeys');
        }
    }


    render() {
        return (
            <div className='restocking'>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                        merchantsList={toJS(State.merchantsList)}
                        setCurrent={State.setCurrent}
                    />
                </Form>
                <HeadComponent
                    addClick={State.addClick}
                    {...this.props}
                    beginCheck={State.beginCheck}
                />
                <NewTable
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey={(v, i) => i}
                    bordered
                    rowSelection={this.rowSelection}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                    scroll={{x: 1790, y: 1000}}
                />

                <ComfirmRestock
                    visible={State.visible}
                    dataSource={State.restockData}
                    restockObj={State.restockObj}
                    addRow={State.addRow}
                    delRow={State.delRow}
                    changeRow={State.changeRow}
                    onOk={State.onOk}
                    onCancel={State.onCancel}
                    finalStoreData={State.finalStoreData}
                />
            </div>
        );
    }
}


export default Index;