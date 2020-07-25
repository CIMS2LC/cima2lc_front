import React from 'react';
import {
  Button,
  Layout,
  Tabs,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  DatePicker,
  TreeSelect,
  Tree,
  Select,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import { check } from 'prettier';
import { RedEnvelopeFilled } from '@ant-design/icons';
import { IniDiaProsave, IniDiaupdate } from '../../service';
const layout = {
  labelAlign: 'left',
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 14,
  },
};
const inputlayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 5,
  },
};
const longinputlayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 5,
  },
};
export const treeData = [
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
const { Option } = Select;
class InitialDiagnosisProcess extends React.Component {
  constructor(props: any) {
    super(props);
    this.pid = props.pid;
    this.initialValues = props.initialValues;
    console.log(this.initialValues);
    if (this.initialValues) {
      this.id = this.initialValues['id'];
      //this.initialValues.cliniManifest = (this.initialValues.cliniManifest || "").split(','); //多选string分成数组
      //this.initialValues.part = (this.initialValues.part || '').split(',');
      //this.initialValues.bioMet = (this.initialValues.bioMet || '').split(',');
      //this.initialValues.traSite = (this.initialValues.traSite || '').split(',');

      if (this.initialValues.firVisDate)
        this.initialValues.firVisDate = moment(this.initialValues.firVisDate);
      if (this.initialValues.patReDate)
        this.initialValues.patReDate = moment(this.initialValues.patReDate);
      this.state.patDia = this.initialValues.patDia;

      if (this.initialValues.cStage) {
        let cStage = this.initialValues.cStage.split(',');
        this.initialValues.C_T = cStage[0];
        this.initialValues.C_N = cStage[1];
        this.initialValues.C_M = cStage[2];
      }
      if (this.initialValues.pStage) {
        let pStage = this.initialValues.pStage.split(',');
        this.initialValues.P_T = pStage[0];
        this.initialValues.P_N = pStage[1];
        this.initialValues.P_M = pStage[2]; //病理信息Tree
      }
      //this.initialValues.C_T = this.initialValues.cStage.split(',')[0];
      //this.initialValues.C_N = this.initialValues.cStage.split(',')[1];
      //this.initialValues.C_M = this.initialValues.cStage.split(',')[2];
      //this.initialValues.P_T = this.initialValues.pStage.split(',')[0];
      //this.initialValues.P_N = this.initialValues.pStage.split(',')[1];
      //this.initialValues.P_M = this.initialValues.pStage.split(',')[2]; //病理信息Tree

      if (this.initialValues.stage == '3') this.state.c_installment = 1;
      if (this.initialValues.stage == '4') this.state.p_installment = 1;
      if (this.initialValues.stage == '5') {
        this.state.c_installment = 1;
        this.state.p_installment = 1;
      }
    }
  }
  initialValues = {};
  id = -1;
  pid = -1;
  state = {
    value: 1,
    p_installment: 0,
    c_installment: 0,
    patDia: '', //病例分析的值
    C_T: '',
    C_N: '',
    C_M: '',
    P_T: '',
    P_N: '',
    P_M: '',
  };

  onFinish = async (values: any) => {
    //提交成功的操作函数
    //message.success('提交成功!');
    if (values.firVisDate)
      values.firVisDate = values.firVisDate.format('YYYY-MM-DD');
    if (values.patReDate)
      values.patReDate = values.patReDate.format('YYYY-MM-DD');

    values.cStage =
      (values.C_T ? values.C_T : '') +
      ',' +
      (values.C_N ? values.C_N : '') +
      ',' +
      (values.C_M ? values.C_M : '');

    values.pStage =
      (values.P_T ? values.P_T : '') +
      ',' +
      (values.P_N ? values.P_N : '') +
      ',' +
      (values.P_M ? values.P_M : '');

    values.cliniManifest = (values.cliniManifest || []).toString(); //临床表现
    values.part = (values.part || []).toString();
    values.bioMet = (values.bioMet || []).toString(); //多选转字符
    values.traSite = (values.traSite || []).toString();
    values = {
      ...values,
      pid: this.pid,
      patDia: this.state.patDia, //添加病理信息
    };
    if (this.id != -1) {
      console.log(values.videography);
      const res = await IniDiaupdate({
        id: this.id,
        pid: this.props.pid,
        ...values,
      });
      if (res.code == 200) {
        console.log('更新成功');
      } else {
        console.log('更新失败');
      }
    } else {
      const res = await IniDiaProsave({ pid: this.props.pid, ...values });
      if (res.code == 200) {
        this.id = res.id;
        console.log('提交成功');
      } else {
        console.log('提交失败');
      }
    }
    console.log(values); //需要传入后端的值
  };

  clinical_manifestation_Options = [
    //临床表现
    '颈部肿物',
    '咳嗽',
    '咳痰',
    '痰中带血',
    '咳血',
    '胸闷',
    '胸痛',
    '气促',
    '发热',
    '食欲不佳',
    '体重减轻',
    '其他',
    '无',
  ];
  part_Options = ['左上肺', '左下肺', '右上肺', '右中肺', '右下肺'];
  biopsy_way_Options = [
    '手术',
    '纵隔镜',
    '胸腔镜',
    '肺穿刺',
    '纤支镜',
    'EBUS',
    'EUS',
    '淋巴结活检',
    '其他',
  ];
  transfer_site_Options = [
    '肺内',
    '对侧肺',
    '胸腔镜',
    '脑',
    '脊柱',
    '四肢骨',
    '肝',
    '脾',
    '肾上腺',
    '胰腺',
    '双肺',
    '其他',
  ];
  onCheck = (checkedKeys: string) => {
    //点击病例诊断，把数据格式改变传入state
    let checkvalues = checkedKeys.toString();
    this.setState({ patDia: checkvalues });
  };
  formRef = React.createRef();
  render() {
    return (
      <Form
        {...layout}
        onFinish={this.onFinish}
        ref={this.formRef}
        initialValues={this.initialValues}
      >
        <Form.Item label="首诊PS评分" name="PSScore">
          <Radio.Group value={this.state.value}>
            {[...Array(5).keys()].map(i => (
              <Radio value={i}>{i}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="临床表现" name="cliniManifest">
          <Checkbox.Group options={this.clinical_manifestation_Options} />
        </Form.Item>
        <Form.Item label="影像学" name="videography">
          <Radio.Group>
            <Radio value={false}>周围型</Radio>
            <Radio value={true}>中央型</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="部位" name="part">
          <Checkbox.Group options={this.part_Options} />
        </Form.Item>

        <Form.Item label="活检方式" name="bioMet">
          <Checkbox.Group options={this.biopsy_way_Options} />
        </Form.Item>

        <Form.Item label="是否胸膜侵犯" name="pleInv">
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="标本部位" {...inputlayout} name="speSite">
          <Input />
        </Form.Item>
        <Form.Item label="初诊日期" {...inputlayout} name="firVisDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="病理报告日期" {...inputlayout} name="patReDate">
          <DatePicker format="YYYY/MM/DD" />
        </Form.Item>
        <Form.Item label="病理号" {...inputlayout} name="patNum">
          <Input />
        </Form.Item>

        <Form.Item label="病理诊断" {...inputlayout} name="patDia">
          <Tree
            checkable
            checkedKeys={(this.state.patDia || '').split(',')}
            onCheck={this.onCheck}
            treeData={treeData} //在data里面放了value(正常是不需要的)，出了问题就把value删了
          />
        </Form.Item>

        <Form.Item
          label="核分裂像/2mm2=个人显微镜8.3个40倍高倍视野"
          name="mitIma"
          {...longinputlayout}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="复合性癌(记录非小细胞癌的类型)"
          name="comCar"
          {...longinputlayout}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="坏死面积（占肿瘤面积的百分比）"
          name="necArea"
          {...longinputlayout}
        >
          <Input />
        </Form.Item>
        <Form.Item label="肿块大小(mm)" name="massSize" {...inputlayout}>
          <Input />
        </Form.Item>
        <Form.Item label="Ki67（%）" name="Ki67" {...inputlayout}>
          <Input />
        </Form.Item>
        <Form.Item label="转移部位" name="traSite">
          <Checkbox.Group options={this.transfer_site_Options} />
        </Form.Item>

        <Form.Item label="TSize" name="TSize" {...inputlayout}>
          <Input />
        </Form.Item>

        <Form.Item label="分期情况" name="stage">
          <Radio.Group
            onChange={v => {
              if (v.target.value === '3') {
                this.setState({ c_installment: 1, p_installment: 0 });
              } else if (v.target.value === '4')
                this.setState({ p_installment: 1, c_installment: 0 });
              else if (v.target.value === '5')
                this.setState({ c_installment: 1, p_installment: 1 });
              else this.setState({ c_installment: 0, p_installment: 0 });
            }}
          >
            <Radio value="1">无=未住院</Radio>
            <Radio value="2">无法分期=C/P/S均无法分期</Radio>
            <Radio value="3">仅C分期</Radio>
            <Radio value="4">仅P分期</Radio>
            <Radio value="5">c分期和P分期</Radio>
          </Radio.Group>
        </Form.Item>
        {this.state.c_installment ? (
          <Form.Item label="C分期" name="cStage">
            <Row>
              <Col span={6}>
                <Form.Item label="T" name="C_T">
                  <Select style={{ width: 100 }} value={this.state.C_T}>
                    <Option value="1">1</Option>
                    <Option value="1a">1a</Option>
                    <Option value="1b">1b</Option>
                    <Option value="1c">1c</Option>
                    <Option value="2">2</Option>
                    <Option value="2a">2a</Option>
                    <Option value="2b">2b</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="N" name="C_N">
                  <Select style={{ width: 100 }} value={this.state.C_N}>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="M" name="C_M">
                  <Select style={{ width: 100 }} value={this.state.C_M}>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="1a">1a</Option>
                    <Option value="1b">1b</Option>
                    <Option value="1c">1c</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="临床分期" name="cliStage">
                  <Select style={{ width: 100 }}>
                    <Option value="I">I</Option>
                    <Option value="IA1">IA1</Option>
                    <Option value="IA2">IA2</Option>
                    <Option value="IA3">IA3</Option>
                    <Option value="IB">IB</Option>
                    <Option value="II">II</Option>
                    <Option value="IIA">IIA</Option>
                    <Option value="IIB">IIB</Option>
                    <Option value="III">III</Option>
                    <Option value="IIIA">IIIA</Option>
                    <Option value="IIIB">IIIB</Option>
                    <Option value="IIIC">IIIC</Option>
                    <Option value="IV">IV</Option>
                    <Option value="IVA">IVA</Option>
                    <Option value="IVB">IVB</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        ) : null}
        {this.state.p_installment ? (
          <Form.Item label="P分期" name="pStage">
            <Row>
              <Col span={6}>
                <Form.Item label="T" name="P_T">
                  <Select style={{ width: 100 }} value={this.state.P_T}>
                    T:
                    <Option value="1">1</Option>
                    <Option value="1a">1a</Option>
                    <Option value="1b">1b</Option>
                    <Option value="1c">1c</Option>
                    <Option value="2">2</Option>
                    <Option value="2a">2a</Option>
                    <Option value="2b">2b</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="N" name="P_N">
                  <Select style={{ width: 100 }} value={this.state.P_N}>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="M" name="P_M">
                  <Select style={{ width: 100 }} value={this.state.P_M}>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="1a">1a</Option>
                    <Option value="1b">1b</Option>
                    <Option value="1c">1c</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="病理分期" name="patStage">
                  <Select style={{ width: 100 }}>
                    <Option value="I">I</Option>
                    <Option value="IA1">IA1</Option>
                    <Option value="IA2">IA2</Option>
                    <Option value="IA3">IA3</Option>
                    <Option value="IB">IB</Option>
                    <Option value="II">II</Option>
                    <Option value="IIA">IIA</Option>
                    <Option value="IIB">IIB</Option>
                    <Option value="III">III</Option>
                    <Option value="IIIA">IIIA</Option>
                    <Option value="IIIB">IIIB</Option>
                    <Option value="IIIC">IIIC</Option>
                    <Option value="IV">IV</Option>
                    <Option value="IVA">IVA</Option>
                    <Option value="IVB">IVB</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        ) : null}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default InitialDiagnosisProcess;
