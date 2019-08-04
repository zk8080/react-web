import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
// import {Table} from '@pubComs';
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
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey={(v, i) => i}
                    pagination={false}
                    bordered
                    rowSelection={this.rowSelection}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
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