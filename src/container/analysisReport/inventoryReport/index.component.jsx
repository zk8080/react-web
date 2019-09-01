import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import { NewTable } from '@pubComs';
import {colums} from './index.data';
import '../inboundReport/index.less';
import { toJS } from 'mobx';
import {Form} from 'antd';
import {formUtils} from '@utils';
import FormComponent from './components/formComponent/index.component';
import HeadComponent from './components/headComponent/index.component';
import KuweiModal from '../components/kuweiModal/index.component';
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
        State.getMerchantsList();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='inboundReport'>
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
                    queryData={formUtils.formToParams(toJS(State.queryForm || {}))}
                />
                <NewTable
                    dataSource={toJS(State.tableList)}
                    columns={colums}
                    // rowKey='id'
                    bordered
                    scroll={{x: 1700}}
                    getQueryData={State.getTableList}
                    pagination={toJS(State.pageInfo)}
                />

                <KuweiModal title='库位信息'/>
            </div>
        );
    }
}


export default Index;