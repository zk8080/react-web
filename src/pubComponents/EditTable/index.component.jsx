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

    save = (type, key, e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values }, key);
        });
    };

    changeSelect = (type, key, e, option) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            this.toggleEdit();
            console.log(  { ...values }, '--{ ...record, ...values }--')
            console.log( key, '---key---' )
            handleSave({ ...record, ...values }, key, option);
        });
    };

    changeDate = (key, value) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && !value) {
                return;
            }
            const newValue = {};
            for(const key in values){
                newValue[key] = value? value.format('YYYY-MM-DD'): null;
            }
            this.toggleEdit();
            handleSave({ ...record, ...newValue }, key);
        });
        
    }

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, type, required, optionarr, code, name } = this.props;
        
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
                    })(<DatePicker allowClear={false} format='YYYY-MM-DD' ref={node => (this.input = node)} onChange={this.changeDate.bind(this, dataIndex)}/>)}
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
                                // onPressEnter={this.save.bind(this, 'select', dataIndex)} 
                                onBlur={this.save.bind(this, 'select', dataIndex)} 
                                onChange={this.changeSelect.bind(this, 'select', dataIndex)}
                                option={optionarr}
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
                        })(<Input ref={node => (this.input = node)} onPressEnter={this.save.bind(this, 'input', dataIndex)} onBlur={this.save.bind(this, 'input', dataIndex)} />)}
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
        console.log( scrollX, '-----scrollX-----' );
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
                    optionarr: this.props.optionarr,
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
