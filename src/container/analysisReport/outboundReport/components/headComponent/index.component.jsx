import React, { Component } from "react";
import { DownLoad } from '@pubComs'

class Index extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <DownLoad path='/statistics/export/outStorehouseExcel' params={this.props.queryData}/>
        )
    }
}

export default Index;