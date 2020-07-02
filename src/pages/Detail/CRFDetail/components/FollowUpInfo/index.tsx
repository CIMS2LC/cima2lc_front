import styles from './index.less';
import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  TimePicker,
  Select,
} from 'antd';

const EditableContext = React.createContext<any>();

interface Item {
  order: number;
  followup_time: Date;
  response_evaluation: string;
  remark: string;
  image_type: number;
}

interface EditableRowProps {
  index: number;
}

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

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Item;
  handleSave: (record: Item) => void;
}

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

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'order',
        width: '5%',
      },
      {
        title: '随访日期',
        key: 'followup_time',
        width: '10%',
        render: () => <TimePicker />,
      },
      {
        title: '随访方式',
        key: 'followup_way',
        width: '10%',
        render: () => (
          <Select style={{ width: 120 }} options={this.fw_Options} />
        ),
      },
      {
        title: '疗效评估',
        dataIndex: 'response_evaluation',
        width: '10%',
        render: () => (
          <Select style={{ width: 120 }} options={this.re_Options} />
        ),
      },
      {
        title: '生存状态',
        dataIndex: 'live_state',
        width: '10%',
        render: () => (
          <Select style={{ width: 120 }} options={this.ls_Options} />
        ),
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: '10%',
        editable: true,
      },
      {
        title: '影像类型',
        dataIndex: 'image_type',
        width: '10%',
        render: () => (
          <Select style={{ width: 120 }} options={this.it_Options} />
        ),
      },
      {
        title: '影像',
        dataIndex: 'image',
        width: '10%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.fw_Options = [
      { label: '电话', value: 1 },
      { label: '门诊', value: 2 },
      { label: '住院', value: 3 },
    ];
    this.re_Options = [
      { label: 'PD-进展', value: 1 },
      { label: 'SD-稳定', value: 2 },
      { label: 'PR-部分缓解', value: 3 },
      { label: 'CR-完全缓解', value: 4 },
      { label: '术后未发现新病灶', value: 5 },
    ];
    this.ls_Options = [
      { label: '死亡', value: 1 },
      { label: '存活', value: 2 },
      { label: '失联', value: 3 },
    ];
    this.it_Options = [
      { label: 'X光', value: 1 },
      { label: '超声', value: 2 },
      { label: 'CT', value: 3 },
      { label: 'MRI', value: 4 },
      { label: 'PET/CT', value: 5 },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          order: 1,
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          order: 2,
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
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
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-edit-cell">
      <EditableTable />
    </div>
  </div>
);
