import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import "./index.css";
import { screen } from '../service';
import { Modal, Button, Form, Checkbox, Select, Tree, Radio } from 'antd';
const layout = {
  labelAlign: 'left',
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 5,
    //offset: 1
  },
};
const inputlayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
    //offset: 1
  },
};
const patOps = [
  { label: 'I', value: 'I' },
  { label: 'IA1', value: 'IA1' },
  { label: 'IA2', value: 'IA2' },
  { label: 'IA3', value: 'IA3' },
  { label: 'IB', value: 'IB' },
  { label: 'II', value: 'II' },
  { label: 'IIA', value: 'IIA' },
  { label: 'IIB', value: 'IIB' },
  { label: 'III', value: 'III' },
  { label: 'IIIA', value: 'IIIA' },
  { label: 'IIIB', value: 'IIIB' },
  { label: 'IIIC', value: 'IIIC' },
  { label: 'IV', value: 'IV' },
  { label: 'IVA', value: 'IVA' },
  { label: 'IVB', value: 'IVB' },
];

const genes = [
  { label: 'ALK', value: 'ALK' },
  { label: 'BIM', value: 'BIM' },
  { label: 'BRAF', value: 'BRAF' },
  { label: 'cMET', value: 'cMET' },
  { label: 'EGFR', value: 'EGFR' },
  { label: 'HER_2', value: 'HER_2' },
  { label: 'HER-2-co', value: 'HER_2_co' },
  { label: 'PIK3CA', value: 'PIK3CA' },
  { label: 'ROS1', value: 'ROS1' },
  { label: 'RET', value: 'RET' },
  { label: 'UGT1A1', value: 'UGT1A1' },
];
const traSite = [
  { label: '肺内', value: '肺内' },
  { label: '对侧肺', value: '对侧肺' },
  { label: '胸腔镜', value: '胸腔镜' },
  { label: '脑', value: '脑' },
  { label: '脊柱', value: '脊柱' },
  { label: '四肢骨', value: '四肢骨' },
  { label: '肝', value: '肝' },
  { label: '脾', value: '脾' },
  { label: '肾上腺', value: '肾上腺' },
  { label: '胰腺', value: '胰腺' },
  { label: '双肺', value: '双肺' },
  { label: '其他', value: '其他' },
];
const treSolu = [
  { label: '化疗', value: 'Chemotherapy' },
  { label: '靶向治疗', value: 'TargetedTherapy' },
  { label: '手术', value: 'surgery' },
  { label: '放疗', value: 'radiotherapy' },
];
const treeData = [
  //病例诊断信息
  {
    title: '上皮型肿瘤',
    key: '0-0',
    children: [
      {
        title: '腺癌',
        key: '0-0-0',
        children: [
          {
            title: '贴壁型',
            key: '0-0-0-0',
          },
          {
            title: '腺泡型',
            key: '0-0-0-1',
          },
        ],
      },
    ],
  },
];

class Statistic extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: this.props.visible,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <>
        <Modal
          title="条件筛选"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <Form
            name="statistic"
            {...layout}
            onFinish={async value => {
              console.log(value);
              await screen(value);
            }}
            ref={this.formRef}
            initialValues={this.initialValues}
          >
            <Form.Item label="病理诊断" {...inputlayout} name="patDia">
              <Tree checkable treeData={treeData} />
            </Form.Item>
            <Form.Item label="病理分期" name="patStage">
              <Select style={{ width: 80 }} options={patOps} />
            </Form.Item>
            <Form.Item label="基因突变点位" name="genes">
              <Checkbox.Group options={genes} style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="转移部位" name="traSite">
              <Checkbox.Group options={traSite} style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="治疗方式" name="treSolu">
              <Select style={{ width: 80 }} options={treSolu} />
            </Form.Item>
            <Form.Item label="性别" name="gender">
              <Radio.Group>
                <Radio value={true}>男</Radio>
                <Radio value={false}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Statistic;
