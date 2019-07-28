import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
// import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form, Table} from 'antd';
import FormComponent from './components/formComponent/index.component';
import HeadComponent from './components/headComponent/index.component';
import DetailComponent from './components/detailComponent/index.component';
import ShelfComponent from './components/shelfComponent/index.component';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getTableList();
    }

    saveClick = (obj) => {
        State.saveData(obj);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Form>
                    <FormComponent 
                        queryData={toJS(State.queryForm)}
                        setQueryData={State.setQueryForm}
                        getData={State.getTableList}
                    />
                </Form>
                {/* <HeadComponent
                    addClick={State.addClick}
                    successCbk={State.getTableList}
                /> */}
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey='id'
                    bordered
                    scroll={{x: 1500}}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                />
                <DetailComponent
                    {...toJS(State)}
                    visible={State.visible}
                    cancelClick={State.toggleVisible}
                    onOk={this.saveClick}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    disabled={State.disabled}
                    toggleDisabled={State.toggleDisabled}
                    dataSource={toJS(State.editTable)}
                />
                <ShelfComponent
                    visible={State.shelfVisible}
                    cancelClick={State.closeShelfVisible}
                />
            </div>
        );
    }
}


export default Index;