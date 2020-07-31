import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  Select,
  Popover,
  InputNumber,
  Radio,
  Tag,
  DatePicker,
} from 'antd';
import moment from 'moment';

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

const treat_schedule_medicine_options = {
  chemotherapy: {
    'EP方案（依托泊苷+奈达铂/顺铂/卡铂）': [{ value: '依托泊苷' }],
    'GP方案（吉西他滨+奈达铂/顺铂/卡铂）': [{ value: '吉西他滨' }],
    'DP方案（多西他赛+奈达铂/顺铂/卡铂）': [{ value: '多西他赛' }],
    'TP方案（紫杉醇+奈达铂/顺铂/卡铂）': [{ value: '紫杉醇' }],
    'NP方案（长春瑞滨+奈达铂/顺铂/卡铂）': [{ value: '长春瑞滨' }],
    'PP方案（培美曲塞+奈达铂/顺铂/卡铂）': [{ value: '培美曲塞' }],
    常用药物: [
      { value: '紫杉醇' },
      { value: '白蛋白紫杉醇' },
      { value: '伊立替康' },
      { value: '托泊替康' },
      { value: '铂类药物' },
      { value: '其他' },
    ],
  },
  targetedtherapy: {
    常用药物: [
      { value: '吉非替尼' },
      { value: '厄洛替尼' },
      { value: '埃克替尼' },
      { value: '阿法替尼' },
      { value: '克唑替尼' },
      { value: '奥希替尼' },
      { value: '曲妥珠单抗' },
      { value: '拉帕替尼' },
      { value: '贝伐单抗' },
      { value: '依维莫司' },
      { value: '尼妥珠单抗' },
      { value: '帕妥珠单抗' },
      { value: 'TDM1' },
      { value: '不详' },
      { value: '其他' },
    ],
  },
  immunotherapy: {},
  antivasculartherapy: {
    常用药物: [
      { value: '重组人血管内皮抑素' },
      { value: '贝伐珠单抗' },
      { value: '安罗替尼' },
      { value: '阿帕替尼' },
    ],
  },
};

class TreatSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '治疗名称',
        dataIndex: 'treatName',
        width: '10%',
        editable: true,
      },
      {
        title: '药物方案',
        dataIndex: 'treSche',
        width: '10%',
        render: (text, record, index) => {
          return (
            <Select
              style={{ width: 120 }}
              onChange={value => {
                record['treSolu'] = value;
                record['treSche'] = value;
                this.setState({ treSolu: value });
              }}
              defaultValue={record['treSche'] || '常用药物'}
              options={Object.keys(
                treat_schedule_medicine_options[this.props.treat_schedule_name],
              ).map(item => ({ value: item }))}
            />
          );
        },
      },
      {
        title: '药物名称',
        key: 'drugName',
        width: '20%',
        render: (text, record, index) => {
          return (
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Tags Mode"
              options={
                treat_schedule_medicine_options[this.props.treat_schedule_name][
                  this.state.treSolu
                ]
              }
              defaultValue={record['drugs'] ? Object.keys(record['drugs']) : []}
              onChange={values => {
                var drugs = record['drugs'];
                if (!drugs) drugs = {};
                values.map(item => {
                  if (!drugs[[item]]) drugs[[item]] = {};
                });
                record['drugs'] = drugs;
              }}
              tagRender={tagvalue => (
                <Popover
                  content={
                    <div>
                      <label>剂量</label>
                      <InputNumber
                        defaultValue={
                          record['drugs'][`${tagvalue.value}`]['drugDosa'] || ''
                        }
                        onChange={value => {
                          record['drugs'][`${tagvalue.value}`][
                            'drugDosa'
                          ] = value;
                          console.log(record);
                        }}
                      />
                      <label>单位</label>
                      <Radio.Group
                        defaultValue={
                          record['drugs'][`${tagvalue.value}`]['unit'] || 'g'
                        }
                        onChange={e => {
                          record['drugs'][`${tagvalue.value}`]['unit'] =
                            e.target.value;
                          console.log(record);
                        }}
                      >
                        <Radio value={'g'}>克</Radio>
                        <Radio value={'mg'}>毫克</Radio>
                        <Radio value={'ml'}>毫升</Radio>
                      </Radio.Group>
                    </div>
                  }
                >
                  <Tag>{tagvalue.value}</Tag>
                </Popover>
              )}
            ></Select>
          );
        },
      },
      {
        title: '给药/治疗开始日期',
        key: 'begDate',
        width: '20%',
        render: (text, record, index) => (
          <DatePicker
            defaultValue={moment(record['begDate'])}
            onChange={(e, value) => {
              record['begDate'] = moment(value).format('YYYY-MM-DD');
            }}
          />
        ),
      },
      {
        title: '给药/治疗结束日期',
        key: 'endDate',
        width: '20%',
        render: (text, record, index) => (
          <DatePicker
            defaultValue={moment(record['endDate'])}
            onChange={(e, value) => {
              record['endDate'] = moment(value).format('YYYY-MM-DD');
            }}
          />
        ),
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

    if (props.dataSource) {
      console.log(props.dataSource);
      // props.dataSource.map(item=>{
      //   if(item['begDate']) item['begDate'] = moment(item['begDate']);
      //   if(item['endDate']) item['endDate'] = moment(item['endDate']);

      // })
    }
    this.state = {
      dataSource: props.dataSource ? props.dataSource : [],
      count: props.dataSource ? props.dataSource.length : 0,
      treSolu: '常用药物',
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    let newData = {
      treatName: 'xxx',
      key: count,
      id: count,
      currPeriod: count + 1,
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
    console.log(this.state.dataSource);
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

export default TreatSchedule;
