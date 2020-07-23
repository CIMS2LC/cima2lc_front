import React from 'react';
import {
  Form,
  Button,
  Space,
  DatePicker,
  Select,
  Popconfirm,
  Table,
  Upload,
  message,
} from 'antd';
import PicturesWall from './PicturesWall';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { getCookie } from '@/pages/BasicComponents/request';
import { follInfosave } from '../../service';

const fw_Options = [
  { label: '电话', value: 1 },
  { label: '门诊', value: 2 },
  { label: '住院', value: 3 },
];
const re_Options = [
  { label: 'PD-进展', value: 1 },
  { label: 'SD-稳定', value: 2 },
  { label: 'PR-部分缓解', value: 3 },
  { label: 'CR-完全缓解', value: 4 },
  { label: '术后未发现新病灶', value: 5 },
];
const ls_Options = [
  { label: '死亡', value: 1 },
  { label: '存活', value: 2 },
  { label: '失联', value: 3 },
];
const it_Options = [
  { label: 'X光', value: 1 },
  { label: '超声', value: 2 },
  { label: 'CT', value: 3 },
  { label: 'MRI', value: 4 },
  { label: 'PET/CT', value: 5 },
];

function onChange(text, record, index) {
  record[index] = text;
}

class FollowUpInfo extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: '5%',
        render: (text, record, index) => {
          return <span>{index + 1}</span>;
        },
      },
      {
        title: '随访日期',
        dataIndex: 'date',
        key: 'date',
        width: '10%',
        render: (text, record, index) => (
          <DatePicker
            onChange={(e, eString) => {
              onChange(eString, record, 'date');
            }}
          />
        ),
      },
      {
        title: '随访方式',
        dataIndex: 'folMet',
        key: 'folMet',
        width: '10%',
        render: (text, record, index) => (
          <Select
            style={{ width: 120 }}
            options={fw_Options}
            onChange={e => {
              onChange(e, record, 'folMet');
            }}
          />
        ),
      },
      {
        title: '疗效评估',
        dataIndex: 'effEva',
        key: 'effEva',
        width: '10%',
        render: (text, record, index) => (
          <Select
            style={{ width: 120 }}
            options={re_Options}
            onChange={e => {
              onChange(e, record, 'effEva');
            }}
          />
        ),
      },
      {
        title: '生存状态',
        dataIndex: 'livSta',
        key: 'livSta',
        width: '10%',
        render: (text, record, index) => (
          <Select
            style={{ width: 120 }}
            options={ls_Options}
            onChange={e => {
              onChange(e, record, 'livSta');
            }}
          />
        ),
      },
      {
        title: '影像类型',
        dataIndex: 'imaFilType',
        key: 'imaFilType',
        width: '10%',
        render: (text, record, index) => (
          <Select
            style={{ width: 120 }}
            options={it_Options}
            onChange={e => {
              onChange(e, record, 'imaFilType');
            }}
          />
        ),
      },
      {
        title: '影像',
        dataIndex: 'savFilPath',
        key: 'savFilPath',
        width: '10%',
        render: (text, record, index) => (
          <Upload
            name="file[]" //发到后端的文件参数名
            //action="/api/upload" //上传的地址
            action="http://localhost:8001/api/upload" //上传的地址
            headers={{
              authorization: 'authorization-text',
              token: getCookie('token'),
            }}
            multiple={true}
            data={{ pid: this.props.pid }}
            //defaultFileList={this.molDefaultFileList}
            onChange={info => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                var fileList = this.state.file_list;
                fileList = fileList.concat(info.file.response.path);
                console.log(fileList);
                record['savFilPath'] = fileList.toString();
                this.setState({ file_list: fileList });
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
          >
            <Button>
              <UploadOutlined /> 上传报告
            </Button>
          </Upload>
        ),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
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
    console.log(this.props.initialValues);
    this.state = {
      dataSource: this.props.initialValues || [],
      file_list: [],
      count: 0,
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
          //components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Button
          type="primary"
          htmlType="submit"
          onClick={async e => {
            const res = await follInfosave({
              pid: this.props.pid,
              number: 0,
              ...this.state.dataSource,
            });
          }}
        >
          保存
        </Button>
      </div>
    );
  }
}

export default FollowUpInfo;
