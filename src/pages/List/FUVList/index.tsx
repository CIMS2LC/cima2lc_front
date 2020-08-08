import {
  PlusOutlined,
  StopTwoTone,
  DownloadOutlined,
  LogoutOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  message,
  Input,
  Select,
  Popconfirm,
  Table,
  Modal,
  Card,
} from 'antd';
import React from 'react';

import Statistic from './components/statistic';
import { treeData } from '@/pages/Detail/CRFDetail/components/BasicComponents/InitialDiagnosisProcess';
import { TableListItem } from './data.d';
import {
  query,
  queryRule,
  deletelist,
  exportExcel,
  queryFollowUp,
  alarmOff,
} from './service';
import { Link } from 'umi';
import { history } from 'umi';
import moment from 'moment';

const { Option } = Select;
const { Search } = Input;

function getTitle(datas, key, path) {
  if (path === undefined) {
    path = [];
  }
  for (var i of datas) {
    var tmpPath = path;
    tmpPath.push(i.title);

    if (key == i.key) return tmpPath.join('-');
    if (i.children) {
      var res = getTitle(i.children, key, tmpPath);
      if (res) return res;
    }
    tmpPath.pop();
  }
}

class FULList extends React.Component {
  searchInput = React.createRef();
  state = {
    select: 'name',
    data: [],
    selectedRowKeys: [],
    total: 0, //  数据总数量
    current: 1,
    pageSize: 10,
    visible: false,
    visableFollowUp: true,
    followUpList: [],
  };
  columns = [
    {
      title: '住院号/就诊号',
      dataIndex: 'hospitalNumber',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
    },
    {
      title: '联系方式',
      dataIndex: 'phoneNumber',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: text => `${text === '0' ? '女' : text === '1' ? '男' : '-'}`,
    },
    {
      title: '病理诊断',
      dataIndex: 'patDia',
      render: text =>
        `${(text || '').split(',').map(e => getTitle(treeData, e))}`,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (text, record) => {
        return (
          <>
            <Link to={`/detail/crf_detail?id=${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除（不可恢复）？"
              onConfirm={() => this.handleDelete(record)}
            >
              <a>删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  componentDidMount = async () => {
    this.setState({ current: 1 });
    this.searchInput.current.state.value = '';
    //初始化界面的请求操作

    const res = await queryRule({
      current: 1,
      pageSize: this.state.pageSize,
      sorter: {},
    });
    if (res.code == 200) {
      if (res.data) {
        res.data.map(item => {
          item.key = item.id;
        });
      }
      this.setState({ data: res.data, total: res.total });

      if (this.state.visableFollowUp) {
        const res1 = await queryFollowUp({});
        if (res1.code == 200) {
          if (res1.data && res1.data.length > 0) {
            this.setState({ followUpList: res1.data });
            // this.setState({ visableFollowUp: true });
          }
        }
      }
    } else {
      message.error('查询失败，' + res.msg);
    }
  };

  handleDelete = async (key: number) => {
    await deletelist({
      id: key,
    });
  };
  OnSearch = async (key: string, value: string) => {
    const res = await query({ key, value });
    if (res.code == 200) {
      if (res.data) {
        res.data.map(item => {
          item.key = item.id;
        });
      }
      this.setState({ data: res.data, total: res.total });
      message.success('查询成功');
    } else {
      message.error('查询失败，' + res.msg);
      console.log('请求失败', res);
    }
  };
  paginationChange = async (page: number, pageSize: number | undefined) => {
    this.setState({ current: page, pageSize });
    const res = await queryRule({
      current: page,
      pageSize: pageSize,
      sorter: {},
    });
    if (res.code == 200) {
      if (res.data) {
        res.data.map(item => {
          item.key = item.id;
        });
      }
      this.setState({ data: res.data, total: res.total });
    } else {
      message.error('查询失败，' + res.msg);
      console.log('请求失败', res);
    }
  };
  showSizeChange = async (current: number, size: number) => {
    this.setState({ current, pageSize: size });
    const res = await queryRule({
      current: current,
      pageSize: size,
      sorter: {},
    });
    if (res.code == 200) {
      if (res.data) {
        res.data.map(item => {
          item.key = item.id;
        });
      }
      this.setState({ data: res.data, total: res.total });
    } else {
      message.error('查询失败，' + res.msg);
      console.log('请求失败', res);
    }
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div>
          <img
            src={require('@/img/logo.png')}
            style={{ height: 55, width: 200 }}
          />
          <Button
            //className={styles.btn_return}
            type="primary"
            style={{ float: 'right', margin: '10px 5px' }}
            onClick={() => {
              document.cookie = `token=;path=/;expires=${new Date(
                0,
              ).toUTCString()}`;
              history.push('/user/userlogin');
            }}
          >
            <LogoutOutlined />
            退出
          </Button>
          <Button
            //className={styles.btn_return}
            type="default"
            style={{ float: 'right', margin: '10px 50px' }}
            id="btn_questionnaire"
            onClick={() => {
              history.push('/Questionnaire');
            }}
          >
            调查问卷
          </Button>
        </div>
        <div>
          <Modal
            destroyOnClose
            title="随访提醒"
            visible={this.state.visableFollowUp}
            onCancel={() => {
              this.setState({ visableFollowUp: false });
            }}
            footer={null}
          >
            <Card title="待随访病人">
              {this.state.followUpList.map(item => (
                <Card.Grid
                  key={item.id}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  // onTabChange
                >
                  <p>住院号：{item.hospitalNumber}</p>
                  <p>身份证号：{item.idNumber}</p>
                  <p>姓名：{item.name}</p>
                  <p>电话号码：{item.phoneNumber}</p>
                  <p>
                    下次随访时间：
                    {moment(item.nextFollowUpDate).format('YYYY-MM-DD')}
                  </p>
                  <div style={{ 'text-align': 'center' }}>
                    <StopTwoTone
                      style={{ fontSize: 30 }}
                      onClick={async () => {
                        const res = await alarmOff({ pid: item.id });
                        if (res.code === 200) {
                          var list = this.state.followUpList.filter(
                            x => x.id !== item.id,
                          );
                          this.setState({ followUpList: list });
                          message.success('提醒已关闭');
                        } else {
                          message.error('操作失败:' + res.msg);
                        }
                      }}
                    />
                  </div>
                </Card.Grid>
              ))}
            </Card>
          </Modal>
          <div>
            <Select
              defaultValue="name"
              style={{ width: 120 }}
              onChange={value => {
                this.state.select = value;
              }}
            >
              {/* <Option value="all">全部</Option> */}
              <Option value="name">姓名</Option>
              <Option value="idNumber">身份证号</Option>
              <Option value="hospitalNumber">住院号</Option>
            </Select>
            <Search
              placeholder="input search text"
              enterButton="搜索"
              style={{ width: 400 }}
              allowClear={true}
              ref={this.searchInput}
              onSearch={value => {
                if (value != '') {
                  this.OnSearch(this.state.select, value);
                  // this.searchInput.current.state.value = '';
                }
              }}
            />
            <Button
              style={{ margin: '0 5px 0 10px' }}
              type="dafault"
              onClick={this.componentDidMount}
            >
              <ReloadOutlined />
            </Button>
            <Button
              type="primary"
              style={{ float: 'right', margin: '0 5px' }}
              onClick={() => {
                history.push('/detail/crf_detail');
              }}
            >
              <PlusOutlined /> 添加
            </Button>
            <Button
              style={{ margin: '0 5px 0 10px' }}
              type="dafault"
              onClick={() => {
                this.setState({ visible: true });
              }}
            >
              <PlusOutlined /> 统计分析
            </Button>
            <Button
              type="dafault"
              disabled={!hasSelected}
              style={{ margin: '0 5px' }}
              onClick={async () => {
                var pids = [];
                selectedRowKeys.map(item => pids.push(item));
                await exportExcel({ pid: pids });
                this.setState({ selectedRowKeys: [] });
              }}
            >
              <DownloadOutlined />
              CSV导出
            </Button>
          </div>
          <div
            style={{
              margin: '5px 0',
              padding: '20px 20px',
              'font-size': '20px',
              'background-color': '#E6F7FF',
              color: '#1890FF',
            }}
          >
            总人数：{this.state.total}人
          </div>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            pagination={{
              current: this.state.current,
              pageSize: this.state.pageSize,
              total: this.state.total,
              onChange: this.paginationChange,
              onShowSizeChange: this.showSizeChange,
            }}
            rowSelection={rowSelection}
          ></Table>
          {this.state.visible ? (
            <Statistic
              visible={this.state.visible}
              onCancel={() => {
                this.setState({ visible: false });
              }}
              setDataSource={data => {
                this.setState({ data });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default FULList;
