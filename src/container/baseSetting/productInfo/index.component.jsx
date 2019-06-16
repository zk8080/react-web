import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import {Table} from '@pubComs';
import {colums} from './index.data';
import './index.less';
import { toJS } from 'mobx';
import {Form} from 'antd';
import FormComponent from './components/formComponent/index.component';
import HeadComponent from './components/headComponent/index.component';
import DetailComponent from './components/detailComponent/index.component';

@Form.create()
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getProductList();
    }

    toggleVisible = () => {
        this.setState({
            visible: !this.state.visible
        });
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
                        {...this.props}
                    />
                </Form>
                <HeadComponent
                    addClick={this.toggleVisible}
                />
                <Table
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    rowKey='id'
                    scroll={{x: 1320}}
                />
                <DetailComponent
                    visible={this.state.visible}
                    cancelClick={this.toggleVisible}
                    onOk={this.saveClick}
                    detailData={toJS(State.editForm)}
                    setDetailData={State.setEditForm}
                />
            </div>
        );
    }
}


export default Index;