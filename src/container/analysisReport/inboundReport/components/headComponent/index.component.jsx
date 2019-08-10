import React, { Component } from "react";
import { DownLoad } from '@pubComs'

class Index extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <DownLoad path='' params={{}}/>
        )
    }
}

export default Index;