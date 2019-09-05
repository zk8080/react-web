import React, { Component } from 'react';
import { DownLoad, AuthButton } from '@pubComs';

class Index extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <AuthButton
                menuCode='StorehouseUseringReposrtExport'
            >
                <DownLoad path='/statistics/export/storeUsedExcel' params={this.props.queryData}/>
            </AuthButton>
            
        );
    }
}

export default Index;