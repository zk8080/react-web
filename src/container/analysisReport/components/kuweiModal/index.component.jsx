import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import { NewTable } from '@pubComs';
import State from './index.state';
import colums from './index.data';

@observer
class Index extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        State.setVisible(false);
    }

    onOk = () => {
        State.setVisible(false);
        State.setPageInfo({
            current: 1,
            pageSize: 15,
            total: 15
        });
    }

    render(){
        return <Modal
            visible={State.visible}
            title={this.props.title || ''}
            onOk={this.onOk}
            onCancel={this.onOk}
            width={900}
            footer={null}
        >
            <NewTable
                dataSource={toJS(State.tableList)}
                columns={colums}
                // rowKey='id'
                bordered
                scroll={{x: 1000, y: 350}}
                getQueryData={State.getTableList}
                pagination={toJS(State.pageInfo)}
            />

        </Modal>
    }
}

export default Index;