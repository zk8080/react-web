import React, { Component } from 'react';
import { Modal } from 'antd';

class Index extends Component {
    static info = Modal.info;
    static success = Modal.success;
    static error = Modal.error;
    static warning = Modal.warning;
    static confirm = Modal.confirm;
    render() {
        return (
            <div>
                <Modal
                    width='1100px'
                    {...this.props}
                    destroyOnClose={true}
                >
                    {this.props.children}
                </Modal>
            </div>
        );
    }
}

export default Index;