import React, { Component } from 'react';
import {Button} from 'antd';
import {DownLoad, AuthButton} from '@pubComs';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    beginCheck = () => {
        
    }

    render() {
        return (
            <div className='header-component'>
                <AuthButton
                    menuCode='ReplenishProdcutPrint'
                >
                    <Button
                        type='primary'
                        onClick={this.props.print}
                    >
                        打印补货单
                    </Button>
                </AuthButton>
                
            </div>
        );
    }
}


export default Index;