import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';

import HeadComponent from './components/headComponent/index.component';
import DetailComponent from './components/detailComponent/index.component';
import FormComponent from './components/formComponent/index.component';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getRoleList();
        State.getUserList();
    }

    saveClick = (obj) => {
        State.saveData(obj);
    }

    componentWillUnmount() {

    }
    render() {
        return (
            <div className='role-box'>
                <FormComponent
                    queryData={toJS(State.queryForm)}
                    setQueryData={State.setQueryForm}
                    getData={State.getUserList}
                />
                <HeadComponent
                    addClick={State.addClick}
                />
                <Table
                    columns={colums}
                    bordered
                    dataSource={toJS(State.tableList)}
                    getQueryData={State.getUserList}
                    pagination={toJS(State.pageInfo)}
                />
                <DetailComponent
                    visible={State.visible}
                    toggleVisible={State.toggleVisible}
                    onOk={this.saveClick}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                    disabled={State.disabled}
                    toggleDisabled={State.toggleDisabled}
                    roleList={toJS(State.roleList)}
                />
            </div>
        );
    }
}


export default Index;