import React from 'react';
//import EditableTable from '@/pages/BasicComponents/EditableTable';
import { Form, Button, Space, DatePicker, Select, Popconfirm } from 'antd';
import PicturesWall from './PicturesWall';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import moment from 'moment';

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

var data = [];
const onFinish = values => {
  console.log(values);
  if (values.FollInfo) {
    for (let j = 0, len = values.FollInfo.length; j < len; j++) {
      values.FollInfo[j].date = moment(values.FollInfo[j].date).format(
        'YYYY-MM-DD',
      );
    }
    console.log(values.FollInfo);
  }
};

class FollowUpInfo extends React.Component {
  state = {};

  render() {
    return (
      <Form name="form" onFinish={onFinish} autoComplete="off">
        <Form.List name="FollInfo">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map(field => (
                  <Space
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="start"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'key']}
                      fieldKey={[field.fieldKey, 'key']}
                      label="序号"
                    >
                      {field.key + 1}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'date']}
                      fieldKey={[field.fieldKey, 'date']}
                      rules={[{ required: true, message: '缺少随访日期' }]}
                      label="随访日期"
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'folMet']}
                      fieldKey={[field.fieldKey, 'folMet']}
                      rules={[{ required: true, message: '缺少随访方式' }]}
                      label="随访方式"
                    >
                      <Select style={{ width: 120 }} options={fw_Options} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'effEva']} // key={field.key}
                      fieldKey={[field.fieldKey, 'effEva']}
                      rules={[{ required: true, message: '缺少随访方式' }]}
                      label="疗效评估"
                    >
                      <Select style={{ width: 120 }} options={re_Options} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'livSta']}
                      fieldKey={[field.fieldKey, 'livSta']}
                      rules={[{ required: true, message: '缺少生存状态' }]}
                      label="生存状态"
                    >
                      <Select style={{ width: 120 }} options={ls_Options} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'imaFilType']}
                      fieldKey={[field.fieldKey, 'imaFilType']}
                      label="影像类型"
                    >
                      <Select style={{ width: 120 }} options={it_Options} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'savFilPath']}
                      fieldKey={[field.fieldKey, 'savFilPath']}
                      label="影像"
                    >
                      <PicturesWall />
                    </Form.Item>

                    <Popconfirm
                      title="确认删除?"
                      onConfirm={() => {
                        remove(field.name);
                        data.splice(field.name, 1);
                      }}
                    >
                      <MinusCircleOutlined />
                    </Popconfirm>
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      data.push({});
                    }}
                    block
                  >
                    <PlusOutlined />
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default FollowUpInfo;
