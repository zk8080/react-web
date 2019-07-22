import React from 'react';
import { Table, Input, Form, DatePicker } from 'antd';
import { Select } from '@pubComs';
import './index.less';
import moment from 'moment';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus && this.input.focus();
            }
        });
    };

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    changeDate = (value) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            const newValue = {};
            for(const key in values){
                newValue[key] = value? value.format('YYYY-MM-DD'): null;
            }
            this.toggleEdit();
            handleSave({ ...record, ...newValue });
        });
        
    }

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, type, required, optionArr, code, name } = this.props;
        const { editing } = this.state;
        return editing ? (
            type === 'date' ?
                <Form.Item style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                        rules: [
                            {
                                required: required,
                                message: '必填',
                            },
                        ],
                        initialValue: record[dataIndex]?moment(record[dataIndex]): null,
                    })(<DatePicker allowClear={false} ref={node => (this.input = node)} onChange={this.changeDate}/>)}
                </Form.Item>
                : type === 'select' ? 
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: required,
                                    message: '必填',
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(<Select 
                                ref={node => (this.input = node)} 
                                onPressEnter={this.save.bind(this, 'select')} 
                                onBlur={this.save.bind(this, 'select')} 
                                option={optionArr}
                                valueCode={code}
                                valueName={name}
                            />
                        )}
                    </Form.Item>
                    : <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: required,
                                    message: '必填',
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(<Input ref={node => (this.input = node)} onPressEnter={this.save.bind(this, 'input')} onBlur={this.save.bind(this, 'input')} />)}
                    </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollX: null
        };
    }

    getScrollX = (arr = []) => {
        let scrollX = 0;
        arr.map((item, index) => scrollX += item.width);
        return scrollX;
    };
    

    componentDidMount() {
        const scrollX = this.getScrollX(this.props.columns);
        this.setState({
            scrollX
        });
    }

    render() {
        const { dataSource, columns} = this.props;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const curColumns = columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    type: col.type,
                    required: col.required,
                    handleSave: this.props.handleSave,
                    optionArr: this.props.optionArr,
                    code: col.code,
                    name: col.name
                }),
            };
        });
        return (
            <div>
                <Table
                    {...this.props}
                    scroll={{...this.props.scroll, ...{x: this.state.scrollX}}}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={curColumns}
                />
            </div>
        );
    }
}
export default Index;
