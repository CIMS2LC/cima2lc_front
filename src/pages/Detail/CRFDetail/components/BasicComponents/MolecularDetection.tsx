import React from 'react';
import {
  Form,
  Radio,
  Input,
  Switch,
  Button,
  InputNumber,
  Select,
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MoleDetecsave } from '../../service';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};

class MolecularDetection extends React.Component {
  constructor(props: any) {
    super(props);
    this.pid = props.pid;
  }
  id = -1;
  pid = -1;
  state = {
    file_list: [],
    TMB_value: false,
    molecular_detection_labels: {
      ALK: 0,
      BIM: 0,
      BRAF: 0,
      cMET: 0,
      EGFR: 0,
      HER_2: 0,
      HER_2_co: 0,
      PIK3CA: 0,
      ROS1: 0,
      RET: 0,
      UGT1A1: 0,
    },
  };

  render() {
    return (
      <Form
        name="molecular_detection"
        {...layout}
        onFinish={async values => {
          values.path = this.state.file_list.toString();
          if (this.id != -1) {
          } else {
            const res = await MoleDetecsave({ pid: this.pid, ...values });
            if (res.code == 200) {
              this.id = res.id;
              console.log('提交成功');
            } else {
              console.log('提交失败');
            }
          }
        }}
      >
        {Object.keys(this.state.molecular_detection_labels).map(
          (item: string) => (
            <div>
              <Form.Item label={item} name={item}>
                <Radio.Group
                  onChange={e => {
                    var mdls = this.state.molecular_detection_labels;
                    mdls[item] = e.target.value;
                    this.setState({
                      molecular_detection_labels: mdls,
                    });
                  }}
                >
                  <Radio value={2}>无</Radio>
                  <Radio value={0}>阴性</Radio>
                  <Radio value={1}>阳性</Radio>
                </Radio.Group>
              </Form.Item>
              {this.state.molecular_detection_labels[item] == 1 ? (
                <div>
                  <Form.Item label="检测样本" name={`${item}Sam`}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="检测方法" name={`${item}DetMed`}>
                    <Select style={{ width: 120 }} onChange={() => {}}>
                      <Option value="ARMS">ARMS</Option>
                      <Option value="FISH">FISH</Option>
                      <Option value="NGS">NGS</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="检测描述" name={`${item}Desc`}>
                    <Input />
                  </Form.Item>
                </div>
              ) : null}
            </div>
          ),
        )}
        <Form.Item label="MSI" name="MSI">
          <Radio.Group>
            <Radio value={0}>MSS</Radio>
            <Radio value={1}>MSIH</Radio>
            <Radio value={2}>MSIL</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="PD-L1表达" name="PDL1">
          <Radio.Group>
            <Radio value={0}>未测</Radio>
            <Radio value={1}>不详</Radio>
            <Radio value={2}>{'>50%'}</Radio>
            <Radio value={3}>{'1%~50%'}</Radio>
            <Radio value={4}>{'<1%'}</Radio>
            <Radio value={5}>阴性</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="TMB(/Mb)">
          <Form.Item name="TMB">
            <Input disabled={this.state.TMB_value} />
          </Form.Item>
          <Switch
            checkedChildren="已检测"
            unCheckedChildren="未检测"
            defaultChecked
            onChange={checked => {
              this.setState({
                TMB_value: !checked,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="上传" name="upload">
          <Upload
            name="file" //发到后端的文件参数名
            action="https://localhost:8001/api/upload" //上传的地址
            headers={{ authorization: 'authorization-text' }}
            data={{ pid: this.state.pid }}
            onChange={info => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                var fileList = this.state.file_list;
                fileList.concat(info.file.response.path);
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
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default MolecularDetection;
