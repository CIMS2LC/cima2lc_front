import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: any) => void;
}

const EditableContext = React.createContext<any>();

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class Medicine extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '药物名称',
        dataIndex: 'drugName',
        width: '20%',
        // editable: true,
        render: (text, record) => {
          return (
            <Input
              placeholder={'请输入药物名称'}
              defaultValue={text}
              onChange={e => {
                record['drugName'] = e.target.value;
              }}
            />
          );
        },
      },
      {
        title: '日使用剂量',
        dataIndex: 'drugDose',
        width: '20%',
        editable: true,
      },
      {
        title: '累积使用时间（月）',
        dataIndex: 'duration',
        width: '20%',
        editable: true,
      },
      {
        title: '常用操作',
        dataIndex: 'commonOper',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <span>
              <Popconfirm
                title="确认删除（不可恢复）？"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          ) : null,
      },
    ];

    this.state = {
      dataSource: props.dataSource ? props.dataSource : [],
      count: props.dataSource ? props.dataSource.length : 0,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    let newData = {
      drugName: '',
      drugDose: '1g',
      duration: 0,
      key: count,
      id: count,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    this.setState({ dataSource: newData });
    this.props.passData(this.state.dataSource);
  };

  public handleGet = () => {
    return this.state.dataSource;
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
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
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        {this.props.hassave ? (
          <Button
            type="primary"
            htmlType="submit"
            onClick={async e => {
              const res = await this.props.save(this.state.dataSource);
              console.log(this.state.dataSource);
            }}
          >
            保存
          </Button>
        ) : null}
      </div>
    );
  }
}

export default Medicine;
