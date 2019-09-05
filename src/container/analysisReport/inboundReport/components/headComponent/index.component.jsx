import React, { Component } from 'react';
import { DownLoad, AuthButton } from '@pubComs';

class Index extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <AuthButton
                menuCode='InWarehousingReportExport'
            >
                <DownLoad path='/statistics/export/purchaseBillExcel' params={this.props.queryData}/>
            </AuthButton>
        );
    }
}

export default Index;