import React, { Component } from 'react';
import './index.less';
import {inject, observer} from 'mobx-react';

@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='header'>
                <div className='title'>
                    React-Demo
                </div>
                <div className='header-menu'>
                    {
                        this.props.appStore.globalData.name
                    }
                </div>
            </div>
        )
    }
}

Index.propTypes = {

}

export default Index;