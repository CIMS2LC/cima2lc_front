import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import "./index.css";
import { screen } from '../service';
import {
  Modal,
  Button,
  Form,
  Checkbox,
  Select,
  Tree,
  Radio,
  TreeSelect,
} from 'antd';
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
          {
            title: '乳头型',
            key: '0-0-0-2',
          },
          {
            title: '微乳头型',
            key: '0-0-0-3',
          },
          {
            title: '实体型',
            key: '0-0-0-4',
          },
          {
            title: '浸润性粘液腺癌',
            key: '0-0-0-5',
            children: [
              {
                title: '浸润和非浸润性混合型粘液性腺癌',
                key: '0-0-0-5-0',
              },
            ],
          },
          {
            title: '胶质性腺癌',
            key: '0-0-0-6',
          },
          {
            title: '胎儿型腺癌',
            key: '0-0-0-7',
          },
          {
            title: '肠型腺癌',
            key: '0-0-0-8',
          },
          {
            title: '微小浸润性腺癌',
            key: '0-0-0-9',
            children: [
              {
                title: '非粘液性腺癌',
                key: '0-0-0-9-0',
              },
              {
                title: '粘液癌',
                key: '0-0-0-9-1',
              },
            ],
          },
          {
            title: '侵袭前病变',
            key: '0-0-0-10',
            children: [
              {
                title: '非典型腺瘤样增生',
                key: '0-0-0-10-0',
              },
              {
                title: '原位腺癌',
                key: '0-0-0-10-1',
                children: [
                  {
                    title: '非粘液性',
                    key: '0-0-0-10-1-0',
                  },
                  {
                    title: '粘液性',
                    key: '0-0-0-10-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: '鳞癌',
        key: '0-0-1',
        children: [
          {
            title: '角化型鳞癌',
            key: '0-0-1-0',
          },
          {
            title: '非角化型鳞癌',
            key: '0-0-1-1',
          },
          {
            title: '基底鳞状细胞癌',
            key: '0-0-1-2',
          },
          {
            title: '侵袭前病变',
            key: '0-0-1-3',
            children: [
              {
                title: '鳞状细胞原位癌',
                key: '0-0-1-3-0',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: '神经内分泌肿瘤',
    key: '0-1',
    children: [
      {
        title: '小细胞癌',
        key: '0-1-0',
        children: [
          {
            title: '结合小细胞癌',
            key: '0-1-0-0',
          },
        ],
      },
      {
        title: '大细胞神经内分泌癌',
        key: '0-1-1',
        children: [
          {
            title: '结合大细胞神经内分泌癌',
            key: '0-1-1-0',
          },
        ],
      },
      {
        title: '类癌肿瘤',
        key: '0-1-2',
        children: [
          {
            title: '典型类癌肿瘤',
            key: '0-1-2-0',
          },
          {
            title: '非典型类癌肿瘤',
            key: '0-1-2-1',
          },
        ],
      },
      {
        title: '侵袭前的病变',
        key: '0-1-3',
        children: [
          {
            title: '弥漫性特发性肺神经内分泌细胞增生',
            key: '0-1-3-0',
          },
        ],
      },
      {
        title: '大细胞癌',
        key: '0-1-4',
      },
      {
        title: '腺鳞癌',
        key: '0-1-5',
      },
      {
        title: '癌肉瘤样癌',
        key: '0-1-6',
        children: [
          {
            title: '多形性癌',
            key: '0-1-6-0',
          },
          {
            title: '梭形细胞癌',
            key: '0-1-6-1',
          },
          {
            title: '巨细胞癌',
            key: '0-1-6-2',
          },
          {
            title: '癌肉瘤',
            key: '0-1-6-3',
          },
          {
            title: '肺胚细胞瘤',
            key: '0-1-6-4',
          },
        ],
      },
      {
        title: '其他未分类癌',
        key: '0-1-7',
        children: [
          {
            title: '淋巴上皮样癌',
            key: '0-1-7-0',
          },
          {
            title: 'NUT肿瘤',
            key: '0-1-7-1',
          },
        ],
      },
      {
        title: '唾液型肿瘤',
        key: '0-1-8',
        children: [
          {
            title: '粘液表皮样癌肿瘤',
            key: '0-1-8-0',
          },
          {
            title: '腺样囊性癌',
            key: '0-1-8-1',
          },
          {
            title: '上皮-肌上皮癌',
            key: '0-1-8-2',
          },
          {
            title: '多形性腺瘤',
            key: '0-1-8-3',
          },
        ],
      },
      {
        title: '乳头状瘤',
        key: '0-1-9',
        children: [
          {
            title: '鳞状细胞乳头状癌',
            key: '0-1-9-0',
            children: [
              {
                title: '外生型',
                key: '0-1-9-0-0',
              },
              {
                title: '逆向生长',
                key: '0-1-9-0-1',
              },
            ],
          },
          {
            title: '腺型状瘤',
            key: '0-1-9-1',
          },
          {
            title: '腺鳞混合型乳头状瘤',
            key: '0-1-9-2',
          },
        ],
      },
      {
        title: '腺瘤',
        key: '0-1-10',
        children: [
          {
            title: '良性硬化性肺细胞瘤',
            key: '0-1-10-0',
          },
          {
            title: '泡腺腺瘤',
            key: '0-1-10-1',
          },
          {
            title: '乳头状腺瘤',
            key: '0-1-10-2',
          },
          {
            title: '粘液性囊腺瘤腺瘤',
            key: '0-1-10-3',
          },
          {
            title: '粘液腺腺瘤',
            key: '0-1-10-4',
          },
        ],
      },
    ],
  },
  {
    title: '间叶性肿瘤',
    key: '0-2',
    children: [
      {
        title: '肺错构瘤',
        key: '0-2-0',
      },
      {
        title: '软骨瘤',
        key: '0-2-1',
      },
      {
        title: 'PEComatous肿瘤',
        key: '0-2-2',
        children: [
          {
            title: '淋巴管平滑肌瘤病',
            key: '0-2-2-0',
          },
          {
            title: 'PEComa-良性',
            key: '0-2-2-1',
            children: [
              {
                title: '透明细胞瘤',
                key: '0-2-1-1-0',
              },
            ],
          },
          {
            title: 'PEComa-恶性',
            key: '0-2-2-2',
          },
        ],
      },
      {
        title: '先天性支气管周肌纤维母细胞肿瘤',
        key: '0-2-3',
      },
      {
        title: '弥漫性肺淋巴管瘤病',
        key: '0-2-4',
      },
      {
        title: '炎症性肌纤维母细胞瘤',
        key: '0-2-5',
      },
      {
        title: '上皮样血管内皮瘤',
        key: '0-2-6',
      },
      {
        title: '胸膜肺母细胞瘤',
        key: '0-2-7',
      },
      {
        title: '滑膜肉瘤',
        key: '0-2-8',
      },
      {
        title: '肺动脉内膜肉瘤',
        key: '0-2-9',
      },
      {
        title: '肺黏液肉瘤伴EWSR1-CREB1易位',
        key: '0-2-10',
      },
      {
        title: '肌上皮肿瘤',
        key: '0-2-11',
        children: [
          {
            title: '肌上皮瘤',
            key: '0-2-11-0',
          },
          {
            title: '肌上皮癌',
            key: '0-2-11-1',
          },
        ],
      },
      {
        title: '淋巴细胞组织细胞肿瘤',
        key: '0-2-12',
      },
      {
        title: '结外边缘区黏膜相关淋巴组织淋巴瘤（MALT淋巴瘤）',
        key: '0-2-13',
      },
      {
        title: '弥漫性大细胞淋巴瘤',
        key: '0-2-14',
      },
      {
        title: '淋巴瘤样肉芽肿',
        key: '0-2-15',
      },
      {
        title: '血管内大B细胞淋巴瘤',
        key: '0-2-16',
      },
      {
        title: '肺朗格罕细胞组织细胞增生症',
        key: '0-2-17',
      },
      {
        title: 'Erdheim-Chester病',
        key: '0-2-18',
      },
    ],
  },
  {
    title: '异位肿瘤',
    key: '0-3',
    children: [
      {
        title: '生殖细胞肿瘤',
        key: '0-3-0',
        children: [
          {
            title: '畸胎瘤-成熟',
            key: '0-3-0-0',
          },
          {
            title: '畸胎瘤-不成熟',
            key: '0-3-0-1',
          },
        ],
      },
      {
        title: '肺内的胸腺瘤',
        key: '0-3-1',
      },
      {
        title: '黑色素瘤',
        key: '0-3-2',
      },
      {
        title: '脑膜瘤',
        key: '0-3-3',
      },
    ],
  },
  {
    title: '转移性肿瘤',
    key: '0-4',
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
    this.props.onCancel();
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
    this.props.onCancel();
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
          footer={[]}
        >
          <Form
            name="statistic"
            {...layout}
            onFinish={async value => {
              const res = await screen(value);
              if (res.code == 200) {
                this.props.setDataSource(res.data);
                this.setState({
                  visible: false,
                });
                console.log('查询成功');
              } else {
                console.log(res);
              }
            }}
            ref={this.formRef}
            initialValues={this.initialValues}
          >
            <Form.Item label="病理诊断" {...inputlayout} name="patDia">
              <TreeSelect treeCheckable={true} treeData={treeData} />
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
                搜索
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Statistic;
