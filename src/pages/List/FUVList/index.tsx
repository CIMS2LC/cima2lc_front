import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Dropdown,
  Menu,
  message,
  Input,
  Select,
  Popconfirm,
  Table,
} from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm, { FormValueType } from './components/UpdateForm';
import Statistic from './components/statistic';
import { treeData } from '@/pages/Detail/CRFDetail/components/BasicComponents/InitialDiagnosisProcess';
import { TableListItem } from './data.d';
import {
  query,
  queryRule,
  updateRule,
  addRule,
  removeRule,
  deletelist,
  exportExcel,
  queryFollowUp,
  alarmOff,
} from './service';
import { Link } from 'umi';
import { history } from 'umi';

const { Option } = Select;
const { Search } = Input;
/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deletelist({
      id: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

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
  state = {
    select: 'all',
    data: [],
    selectedRowKeys: [],
    total: 10, //  数据总数量
    current: 1,
    pageSize: 10,
    visible: false,
    visableFollowUp: false,
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
      render: text => `${text === '0' ? '女' : text === '1' ? '男' : text}`,
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
      const res1 = await queryFollowUp({});
      if (res1.code == 200) {
        if (res1.data && res1.data.length > 0) {
          this.setState({ followUpList: res1.data });
          this.setState({ visableFollowUp: true });
        }
      }
    } else {
      console.log('请求失败', res);
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
    } else {
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
      console.log('请求失败', res);
    }
  };
  handleTableChange = (pagination: any) => {
    //换页的数据申请
  };
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <img
          src={require('@/img/logo.png')}
          style={{ height: 60, width: 120 }}
        />
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
                    onClick={async e => {
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
            defaultValue="all"
            style={{ width: 120 }}
            onChange={value => {
              this.state.select = value;
            }}
          >
            <Option value="all">全部</Option>
            <Option value="name">姓名</Option>
            <Option value="idNumber">身份证号</Option>
            <Option value="hospitalNumber">住院号</Option>
          </Select>
          <Search
            placeholder="input search text"
            enterButton="Search"
            style={{ width: 400 }}
            onSearch={value => {
              this.OnSearch(this.state.select, value);
            }}
          />
          <Button
            //className={styles.btn_return}
            style={{ float: 'right' }}
            id="btn_questionnaire"
            onClick={() => {
              history.push('/Questionnaire');
            }}
          >
            调查问卷
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push('/detail/crf_detail');
            }}
          >
            <PlusOutlined /> 添加
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.setState({ visible: true });
            }}
          >
            <PlusOutlined /> 统计分析
          </Button>
          {hasSelected && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await this.handleRemove(selectedRowKeys);
                    }
                    console.log(selectedRowKeys);
                    if (e.key === 'csv') {
                      var pids = [];
                      selectedRowKeys.map(item => pids.push(item));
                      await exportExcel({ pid: pids });
                    }
                  }}
                  selectedRowKeys={[]}
                >
                  <Menu.Item key="csv">CSV导出</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          )}
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
            onChange={this.handleTableChange}
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
