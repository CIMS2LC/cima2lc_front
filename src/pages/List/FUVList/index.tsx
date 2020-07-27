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
} from './service';
import { Link } from 'umi';
import { history } from 'umi';

const { Option } = Select;
const { Search } = Input;

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

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

const TableList: React.FC<{}> = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(
    false,
  );
  const [stepFormValues, setStepFormValues] = useState({});
  const [queryParms, setqueryParms] = useState({});
  const [staticvisible, setStaticvisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const handleDelete = async record => {
    console.log('删除');
    console.log(record);
    await deletelist({
      id: record.id,
    });
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  const columns: ProColumns<TableListItem>[] = [
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
              onConfirm={() => handleDelete(record)}
            >
              <a>删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const state = {
    select: 'all',
    visible: false,
  };
  const showModel = () => {
    setVisible(true);
  };
  return (
    <PageHeaderWrapper>
      <Select
        defaultValue="all"
        style={{ width: 120 }}
        onChange={value => {
          state.select = value;
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
          var key = state.select;
          console.log('123');
          query({ key, value });
          if (actionRef.current) {
            actionRef.current.reload();
          }
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
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={(action, { selectedRows }) => [
          <Button
            type="primary"
            onClick={() => {
              history.push('/detail/crf_detail');
            }}
          >
            <PlusOutlined /> 添加
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              setStaticvisible(true);
            }}
          >
            <PlusOutlined /> 统计分析
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                    console.log(selectedRows);
                    if (e.key === 'csv') {
                      var pids = [];
                      selectedRows.map(item => pids.push(item.id));
                      await exportExcel({ pid: pids });
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="approval">批量审批</Menu.Item>
                  <Menu.Item key="csv">CSV导出</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{' '}
            项&nbsp;&nbsp;
            <span>
              服务调用次数总计{' '}
              {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={(params, sorter, filter) => {
          return queryRule({ ...params, sorter, filter });
        }}
        columns={columns}
        rowSelection={{}}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
      {staticvisible ? (
        <Statistic
          visible={staticvisible}
          onCancel={() => {
            setStaticvisible(false);
          }}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
