import React, { Component } from 'react';
import {observer} from 'mobx-react';
import State from './index.state';
import InventoryInfo from './components/inventoryInfo/index.component';
import BeginCheck from './components/beginCheck/index.component';
import Approve from './components/approve/index.component';
import inventoryInfoState from './components/inventoryInfo/index.state';
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        State.setShow(1);
        inventoryInfoState.getMerchantsList();
    }

    render() {
        return (
            <React.Fragment>
                {
                    State.show == 1?
                        <InventoryInfo {...this.props}/>
                        :
                        State.show == 2?
                            <BeginCheck {...this.props} />
                            :
                            <Approve {...this.props} />
                }
            </React.Fragment>
        );
    }
}


export default Index;