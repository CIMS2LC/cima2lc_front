import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Input, Popconfirm, Select, message } from 'antd';
import { Link } from 'umi';
import styles from './table.less';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;

class QuestionnaireTable extends React.Component {
  state = {
    select: 1,
    data: [
      { key: 1, id: 1 },
      { key: 2, id: 2 },
    ],
    total: 10, //  数据总数量
    pageSize: 10,
  };
  columns = [
    {
      title: 'ID', //列名
      dataIndex: 'id',
      width: 100, //列宽
    },
    {
      title: '住院号',
      dataIndex: 'hosNum',
      width: 150,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 100,
    },
    {
      title: '填表日期',
      dataIndex: 'date',
      width: 200,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text: any, record: { key }) => (
        <Space size="middle">
          <a>
            <Link to={'Questionnaire?id=' + record.key}>查看详情</Link>
          </a>
          <Popconfirm
            title="确定删除?"
            onConfirm={() => this.handleDelete(record.key)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  componentDidMount = () => {
    //初始化界面的请求操作
    let url = '/api/Questionnaire/list';
    axios.post(url, { current: 1, pageSize: this.state.pageSize }).then(res => {
      let dataSource = [...this.state.data];
      dataSource = res.data.data;
      this.setState({ data: dataSource });
      this.setState({ total: res.data.total });
    });
  };

  handleDelete = (key: number) => {
    //删除项
    let deleteurl = '/api/Questionnaire/delete';
    axios.delete(deleteurl, { data: { id: key } }).then(res => {
      //res指所有信息，res.data指其中的数据部分，res.data.data指其中key为data的
      if (res.data.code === 200) {
        const dataSource = [...this.state.data]; //删除并渲染必须进行的操作
        this.setState({ data: dataSource.filter(item => item.key !== key) });
        message.success(res.data.msg);
      } else if (res.data.code === 4002) message.error(res.data.msg);
      else message.error('出现未知错误，请重试！');
    });
  };
  OnSearch = (value: string) => {
    //查找函数
    let url = '/api/Questionnaire/find';
    let Requestdata = {};
    if (this.state.select === 1) Requestdata = { find_id: 1, idNum: value };
    if (this.state.select === 2) Requestdata = { find_id: 2, name: value };
    if (this.state.select === 3) Requestdata = { find_id: 3, hosNum: value };

    axios.post(url, Requestdata).then(res => {
      //res指所有信息，res.data指其中的数据部分，res.data.data指其中key为data的
      if (res.data.code === 200) {
        //成功获取
        let newData = [...this.state.data]; //更新表格必须以这种形式
        newData = res.data.data;
        this.setState({ data: newData });
        this.setState({ total: res.data.total });
      }
      if (res.data.code === 4007)
        //未查询到记录
        message.success(res.data.msg);
      if (res.data.code === 4006)
        //身份信息有误
        message.error(res.data.msg);
    });
  };
  handleTableChange = (pagination: any) => {
    //换页的数据申请  (这里setstate异步的问题，没有及时改变数据，因此直接传递pagination里面的值)
    console.log(pagination.pageSize);
    let url = '/api/Questionnaire/list';
    axios
      .post(url, { current: pagination.current, pageSize: pagination.pageSize })
      .then(res => {
        let dataSource = [...this.state.data]; //删除并渲染必须进行的操作
        dataSource = res.data.list1;
        this.setState({ data: dataSource });
        this.setState({ total: res.data.total });
      });
  };

  render() {
    return (
      <div className={styles.mainlayout}>
        <div>
          <br />
          <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={value => {
              this.setState({ select: value });
            }}
          >
            <Option value={1}>请选择</Option>
            <Option value={2}>姓名</Option>
            <Option value={3}>住院号</Option>
          </Select>
          <Search
            //  placeholder="input search text"
            style={{ width: 250 }}
            enterButton="查找"
            onSearch={this.OnSearch} //查找函数
          />

          <Button style={{ left: 380 }} type="primary">
            <Link to="Questionnaire">肺康复患者调查表</Link>
          </Button>
          <Button style={{ left: 430 }} type="primary">
            <Link to="list/fuv_list">返回主页面</Link>
          </Button>
        </div>
        <br />
        <div>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            pagination={{
              defaultCurrent: 1,
              pageSize: this.state.pageSize,
              total: this.state.total,
            }}
            onChange={this.handleTableChange}
          ></Table>
        </div>
      </div>
    );
  }
}

export default QuestionnaireTable;
