import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { Link } from 'umi';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

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
    await removeRule({
      key: selectedRows.map(row => row.key),
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

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(
    false,
  );
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '住院号',
      dataIndex: 'adnum',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '姓名为必填项',
        },
      ],
    },
    {
      title: '身份证号',
      dataIndex: 'idNum',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '性别',
      dataIndex: 'sex',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '出生年月',
      dataIndex: 'birthday',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '病理诊断',
      dataIndex: 'pathoDiag',
      valueType: 'textarea',
    },
    {
      title: '治疗方案',
      dataIndex: 'theraShed',
      valueType: 'textarea',
    },
    {
      title: '治疗结束时间',
      dataIndex: 'endtreatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '上次随访时间',
      dataIndex: 'lastfolAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '随访疗效评估',
      dataIndex: 'folEffEva',
      valueType: 'textarea',
    },
    // {
    //   title: '服务调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) => `${val} 万`,
    // },
    {
      title: '生存状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '存活', status: 'Processing' },
        2: { text: '死亡', status: 'Success' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <>
            {/* <a
            onClick={() => {
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
          >
            编辑
          </a> */}
            <Link to={`/detail/crf_detail?`}>编辑</Link>
            <Divider type="vertical" />
            <a href="">删除</a>
          </>
        );
      },
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 添加
          </Button>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 统计分析
          </Button>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> CSV导出
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
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
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
        request={(params, sorter, filter) =>
          queryRule({ ...params, sorter, filter })
        }
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<TableListItem, TableListItem>
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
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
    </PageHeaderWrapper>
  );
};

export default TableList;
