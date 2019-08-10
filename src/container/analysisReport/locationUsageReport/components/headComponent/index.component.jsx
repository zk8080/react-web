import React, { Component } from "react";
import { DownLoad } from '@pubComs'

class Index extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <DownLoad path='/statistics/export/storeUsedExcel' params={this.props.queryData}/>
        )
    }
}

export default Index;