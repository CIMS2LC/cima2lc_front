import React from 'react';
import 'antd/dist/antd.css';
import styles from './index.less';
import {
  Form,
  Input,
  Button,
  Select,
  Radio,
  message,
  Checkbox,
  Row,
  Col,
  Modal,
} from 'antd';

const { Option } = Select;

const steps = [
  {
    title: 'First',
    content: 'qwe',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 4,
  },
};
const layout1 = {
  //第三页文本样式
  labelCol: {
    span: 4.5,
    offset: 6, //栅格左侧距离
  },
  wrapperCol: {
    span: 6,
  },
};
const radio = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const radio1 = {
  //第3页的1-28样式
  labelCol: {
    //默认右对齐，
    span: 8, //跨度
    offset: 6, //栅格左侧距离
  },
  wrapperCol: {
    span: 8,
  },
  colon: false,
};
const radio2 = {
  //29、30的radio样式
  labelCol: {
    //默认右对齐，
    span: 5, //跨度
    offset: 6, //栅格左侧距离
  },
  wrapperCol: {
    span: 8,
  },
  colon: false,
};
const radio3 = {
  //31-42的radio样式
  labelCol: {
    //默认右对齐，
    span: 5, //跨度
    offset: 6, //栅格左侧距离
  },
  wrapperCol: {
    span: 10,
  },
  colon: false,
};
const radio4 = {
  //音乐部分的radio样式
  labelCol: {
    //默认右对齐，
    //  span: 1,  //跨度
    offset: 6, //栅格左侧距离
  },
  wrapperCol: {
    span: 10,
  },
  colon: false, //有无冒号
};

const tailLayout = {
  //button样式
  wrapperCol: {
    offset: 13,
    span: 16,
  },
};
const validateMessages = {
  required: "'${label}' 是必填字段",
};

class App extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      current: 0,
      display1: 'block',
      display2: 'none',
      display3: 'none',
      display4: 'none',
      display5: 'none',
    };
  }

  formRef = React.createRef();

  onFinishFailed = (values: any, errorFields: any, outOfDate: any) => {
    //提交失败，说明第一页必填项未填
    this.setState({
      display1: 'block',
      display2: 'none',
      display3: 'none',
      current: 0,
    });
  };
  onFinish = (values: any) => {
    //提交成功的操作函数 values中没有多选框的值
    message.success('提交成功!');
    console.log(values);
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
    if (current == 1) {
      this.setState({ display1: 'none', display2: 'block', display3: 'none' });
    }
    if (current == 2) {
      this.setState({ display1: 'none', display2: 'none', display3: 'block' });
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    if (current == 0) {
      this.setState({ display1: 'block', display2: 'none', display3: 'none' });
    }
    if (current == 1) {
      this.setState({ display1: 'none', display2: 'block', display3: 'none' });
    }
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <div className={styles.title}>
          <br></br>
          胸部肿瘤科肺康复患者调查表
        </div>
        <div className={styles.introduction}>
          <br></br>
          亲爱的病友:
          <br></br>
          &emsp;&emsp;您好！为了解您目前的健康状况以及肺康复训练的效果，请您在护士的帮助下回答以下所有问题，
          并圈出<br></br>
          对您最合适的答案。答案无“正确”与“错误”之分。您提供的信息我们将绝对保密。谢谢您的配合！
        </div>

        <Form.Item {...tailLayout}>
          <Button type="primary">返回</Button>
        </Form.Item>

        <Form
          {...layout}
          ref={this.formRef}
          name="control-hooks"
          validateMessages={validateMessages}
          onFinishFailed={this.onFinishFailed}
          onFinish={this.onFinish}
          scrollToFirstError={false}
        >
          <div style={{ display: this.state.display1 }}>
            <div className={styles.subtitle}>一、基本情况</div>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="hospitalID"
              label="住院号"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="sex"
              label="性别"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group>
                <Radio value="male">男&emsp;&emsp;</Radio>
                <Radio value="female">女</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="age"
              label="年龄"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="height" label="身高（cm）">
              <Input />
            </Form.Item>

            <Form.Item name="weight" label="体重（kg）">
              <Input />
            </Form.Item>

            <Form.Item name="education" label="文化程度">
              <Input />
            </Form.Item>

            <Form.Item name="marriage" label="婚否">
              <Radio.Group>
                <Radio value="married">已婚</Radio>&emsp;&emsp;
                <Radio value="unmarried">未婚</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="phone" label="联系电话">
              <Input />
            </Form.Item>

            <Form.Item name="marriage" label="居住地">
              <Radio.Group>
                <Radio value="city">城市</Radio>&emsp;&emsp;
                <Radio value="countryside">农村</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item {...radio} name="job" label="工作情况">
              <Radio.Group>
                <Radio value="1">有工作</Radio>&emsp;&emsp;
                <Radio value="2">无工作</Radio>&emsp;&emsp;
                <Radio value="3">退休</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item {...radio} name="income" label="年收入情况">
              <Radio.Group>
                <Radio value="1">低于3万元</Radio>&emsp;&emsp;
                <Radio value="2">3-5万元</Radio>&emsp;
                <Radio value="3">5-10万元</Radio>&emsp;
                <Radio value="4">高于10万元</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              {...radio}
              name="have_operation"
              label="填表前肺部有无手术"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group
                onChange={v => {
                  if (v.target.value == 1) {
                    this.setState({ display4: 'block' });
                  } else this.setState({ display4: 'none' });
                }}
              >
                <Radio value="1">有</Radio>&emsp;&emsp;
                <Radio value="0">无</Radio>
              </Radio.Group>
            </Form.Item>

            <div style={{ display: this.state.display4 }}>
              <Form.Item
                {...radio}
                name="operation_time"
                label="如果有，术后多久？"
              >
                <Radio.Group>
                  <Radio value="1">1周</Radio>&emsp;&emsp;
                  <Radio value="2">2-4周</Radio>&emsp;
                  <Radio value="3">1-3个月</Radio>&emsp;
                  <Radio value="4">3个月以上</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <Form.Item
              name="chemotherapy"
              label="是否进行放化疗"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group
                onChange={v => {
                  if (v.target.value == 1) {
                    this.setState({ display5: 'block' });
                  } else this.setState({ display5: 'none' });
                }}
              >
                <Radio value="1">有</Radio>&emsp;&emsp;
                <Radio value="0">无</Radio>
              </Radio.Group>
            </Form.Item>

            <div style={{ display: this.state.display5 }}>
              <Form.Item
                {...radio}
                name="treatment"
                label="如果有，目前在第几个疗程"
              >
                <Radio.Group>
                  <Radio value="1">第1个</Radio>&emsp;&emsp;
                  <Radio value="2">第2-4个</Radio>&emsp;
                  <Radio value="3">第5个以上</Radio>&emsp;
                  <Radio value="4">放化疗结束</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          <div style={{ display: this.state.display2 }}>
            <div className={styles.subtitle}>二、肺功能</div>
            <Form.Item name="PET" label="（1） PET">
              <Input />
            </Form.Item>
            <Form.Item name="PET(%)" label="（2） PET(%)">
              <Input />
            </Form.Item>
            <Form.Item name="FEV1(L)" label="（3） FEV1(L)">
              <Input />
            </Form.Item>
            <Form.Item name="FEV1(%)" label="（4） FEV1(%)">
              <Input />
            </Form.Item>
            <Form.Item name="FVC(L)" label="（5） FVC(L)">
              <Input />
            </Form.Item>
            <Form.Item name="FEV1/FVC" label="（6） FEV1/FVC">
              <Input />
            </Form.Item>
            <div className={styles.subtitle}>三、体力状况</div>
            <Form.Item name="6MWD" label="（1） 6MWD(m)">
              <Input />
            </Form.Item>
            <Form.Item name="ECOG" label="（2） ECOG(分)">
              <Input />
            </Form.Item>
            <Form.Item name="performance_status" label="体力状态：">
              &emsp;&emsp;
              <Radio.Group>
                <Radio value="0">0----活动能力完全正常</Radio>
                <Radio value="1">1----能自由走动及轻体力活动</Radio>
                <Radio value="2">2----生活自理但丧失工作能力</Radio>
                <Radio value="3">3----生活部分自理，日间一半时间卧床</Radio>
                <Radio value="4">4----卧床不起，生活不能自理</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="dyspnea" label="呼吸困难情况：">
              &emsp;&emsp;
              <Radio.Group>
                <Radio value="0">0----我仅在费力运动时出现呼吸困难</Radio>
                <Radio value="1">
                  1----我平地快步行走或步行爬小坡时出现气短
                </Radio>
                <Radio value="2">
                  2----我由于气短，平地行走时比同龄人慢或者需要停下来休息
                </Radio>
                <Radio value="3">
                  3----我在平地行走100米左右或数分钟后需要停下来喘气
                </Radio>
                <Radio value="4">
                  4----我因严重呼吸困难以至于不能离开家，或在穿衣服、脱衣服时出现呼吸困难
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div style={{ display: this.state.display3 }}>
            <div className={styles.subtitle}>
              四、生活质量<br></br>
              （1）EORTC QLQ-C30(version 3)
              （1-28题：1--没有、2--有一点、3--有一些、4--非常多；<br></br>
              29-30题：数字1-7代表从“很差”到很好的“等级”）
            </div>
            <br></br>

            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q1"
              label="1.当您做一些费力的动作，如提沉重的购物袋或行李箱时，您是否感到困难？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q2"
              label="2.长距离步行时，您是否感到困难？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q3"
              label="3.在户外短距离散步时，您是否感到困难？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q4"
              label="4.在白天，您是否必须卧床或坐在椅子上？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q5"
              label="5.您是否需要别人协助进食、穿衣、洗漱或上厕所？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q6"
              label="6.在过去的一周中，您的工作或者日常活动是否受到体能限制？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q7"
              label="7.在过去的一周中，您的业余爱好和休闲活动是否受到体能限制？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q8"
              label="8.在过去的一周中，您曾感到气短吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q9"
              label="9.在过去的一周中，您有过疼痛吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q10"
              label="10.在过去的一周中，您曾需要休息吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q11"
              label="11.在过去的一周中，您曾感到睡眠不好吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q12"
              label="12.在过去的一周中，您曾感到虚弱吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q13"
              label="13.在过去的一周中，您曾感到没有胃口吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q14"
              label="14.在过去的一周中，您曾感受到恶心想吐吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q15"
              label="15.在过去的一周中，您曾呕吐过吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q16"
              label="16.在过去的一周中，您曾有便秘吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q17"
              label="17.在过去的一周中，您曾有过腹泻？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q18"
              label="18.在过去的一周中，您曾感觉疲乏吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q19"
              label="19.在过去的一周中，疼痛妨碍您的日常活动吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q20"
              label="20.在过去的一周中，您是否很难集中注意力做事，例如读报或看电视？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q21"
              label="21.在过去的一周中，您曾感到紧张吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q22"
              label="22.在过去的一周中，您曾感到担心吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q23"
              label="23.在过去的一周中，您曾感到容易动怒吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q24"
              label="24.在过去的一周中，您曾感到情绪低落吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q25"
              label="25.在过去的一周中，您曾经感到记事困难吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q26"
              label="26.在过去的一周中，您的身体状况或治疗过程，妨碍了您的家庭生活吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q27"
              label="27.在过去的一周中，您的身体状况或治疗过程，妨碍了您的社交活动吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio1}
              labelAlign="left"
              name="q28"
              label="28.在过去的一周中，您的身体状况或治疗过程，造成了您的经济困难吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
              </Radio.Group>
            </Form.Item>

            <div className={styles.subtitle}>
              以下问题，数字1-7代表从“很差”到“很好”的等级，请在1至7之间圈出对您最合适的答案。
            </div>
            <Form.Item
              {...radio2}
              labelAlign="left"
              name="q29"
              label="29.您如何评定过去一周中你的整体健康状况？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
                <Radio value="5">5&emsp;</Radio>
                <Radio value="6">6&emsp;</Radio>
                <Radio value="7">7&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio2}
              labelAlign="left"
              name="q30"
              label="30.您如何评定过去一周中你的整体生活质量？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;</Radio>
                <Radio value="2">2&emsp;</Radio>
                <Radio value="3">3&emsp;</Radio>
                <Radio value="4">4&emsp;</Radio>
                <Radio value="5">5&emsp;</Radio>
                <Radio value="6">6&emsp;</Radio>
                <Radio value="7">7&emsp;</Radio>
              </Radio.Group>
            </Form.Item>

            <div className={styles.subtitle}>
              五、EORTC QLQ-LC13 生存质量测定特异量表
              <br></br>
              请指出在过去一周内您所出现的这些临床症状或问题的程度。（1--没有，2--有一点，3--有一些，4--非常多）
            </div>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q31"
              label="31.您经常咳嗽吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q32"
              label="32.您咳血吗（痰中带血）？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q33"
              label="33.您休息时感到气短吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q34"
              label="34.您散步时感到气短吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q35"
              label="35.您爬楼梯时感到气短吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q36"
              label="36.您有过口腔或舌头疼痛吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q37"
              label="37.您有过吞咽困难吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q38"
              label="38.您有过手脚发麻/刺痛吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q39"
              label="39.您有过脱发吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q40"
              label="40.您有过胸痛吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q41"
              label="41.您有过手臂或肩膀疼痛吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q42"
              label="42.您有过身体其他部位的疼痛吗？"
            >
              <Radio.Group>
                <Radio value="1">1&emsp;&emsp;</Radio>
                <Radio value="2">2&emsp;&emsp;</Radio>
                <Radio value="3">3&emsp;&emsp;</Radio>
                <Radio value="4">4&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="body_part"
              {...layout1}
              label="如果有身体或其他部位疼痛，请写出部位"
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...radio3}
              labelAlign="left"
              name="q43"
              label="43、您服用过止疼药吗？"
            >
              <Radio.Group>
                <Radio value="1">1、没有&emsp;&emsp;</Radio>
                <Radio value="2">2、有</Radio>
              </Radio.Group>
            </Form.Item>

            <div className={styles.subtitle}>六、音乐治疗方面：</div>
            <div className={styles.Checkboxlabel}>1、您平时听音乐的频率</div>
            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question1"
              label="&nbsp;"
            >
              <Radio.Group>
                <Radio value="1">1、经常&emsp;&emsp;&emsp;&emsp;</Radio>
                <Radio value="2">2、偶尔&emsp;&emsp;&emsp;&emsp;</Radio>
                <Radio value="3">3、很少&emsp;&emsp;&emsp;&emsp;</Radio>
                <Radio value="4">4、没有&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <div className={styles.Checkboxlabel}>
              2、您平时利用音乐做什么？ 【多选题】
            </div>

            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question2"
              label="&nbsp;"
            >
              <Checkbox.Group className={styles.Checkboxlayout}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="1">1、自我激励&emsp;&emsp;</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="2">2、自我放松&emsp;&emsp;</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="3">3、帮助睡眠&emsp;&emsp;</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="4">4、怀旧&emsp;&emsp;&emsp;</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="5">5、提升记忆&emsp;&emsp;</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <div className={styles.Checkboxlabel}>3、你听说过呼吸操吗？</div>
            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question3"
              label="&nbsp;"
            >
              <Radio.Group>
                <Radio value="1">1、从未听过&emsp;&emsp;</Radio>
                <Radio value="2">2、仅听过&emsp;&emsp;</Radio>
                <Radio value="3">3、有一定了解&emsp;&emsp;</Radio>
                <Radio value="4">4、非常了解&emsp;</Radio>
              </Radio.Group>
            </Form.Item>

            <div className={styles.Checkboxlabel}>
              4、你希望呼吸操对自己哪些方面有帮助？ 【多选题】
            </div>
            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question4"
              label="&nbsp;"
            >
              <Checkbox.Group className={styles.Checkboxlayout}>
                <Row>
                  <Col span={6}>
                    <Checkbox value="1">1、肺部功能恢复</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="2">2、失眠</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="3">3、记忆力衰退</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="4">4、心理困扰</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="5">5、自闭</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="6">6、焦虑症</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="7">7、抑郁症等</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="8">8、其他</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <div className={styles.Checkboxlabel}>5、你愿意做呼吸操吗？</div>
            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question5"
              label="&nbsp;"
            >
              <Radio.Group>
                <Radio value="1">1、愿意&emsp;&emsp;</Radio>
                <Radio value="2">2、随意&emsp;&emsp;</Radio>
                <Radio value="3">3、都可以&emsp;&emsp;</Radio>
                <Radio value="4">4、不知道&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <div className={styles.Checkboxlabel}>
              6、如果愿意做呼吸操，在身体状况允许的情况下你能以什么频率做？
            </div>
            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question6"
              label="&emsp;"
            >
              <Radio.Group>
                <Radio value="1">1、每天&emsp;&emsp;</Radio>
                <Radio value="2">2、每周三次&emsp;&emsp;</Radio>
                <Radio value="3">3、偶尔&emsp;&emsp;</Radio>
                <Radio value="4">4、不知道&emsp;&emsp;</Radio>
              </Radio.Group>
            </Form.Item>
            <div className={styles.Checkboxlabel}>
              7、你愿意用什么形式做呼吸操？
            </div>
            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question7"
              label="&nbsp;"
            >
              <Radio.Group>
                <Radio value="1">1、与病友一起做&emsp;</Radio>
                <Radio value="2">2、单独&emsp;&emsp;</Radio>
                <Radio value="3">3、都可以&emsp;&emsp;</Radio>
                <Radio value="4">4、不知道&emsp;</Radio>
              </Radio.Group>
            </Form.Item>

            <div className={styles.Checkboxlabel}>
              8、对上一题您做的选项，您认为呼吸操对肺部术后有哪些可能疗效？
              【多选题】
            </div>
            <Form.Item
              {...radio4}
              labelAlign="left"
              name="question8"
              label="&nbsp;"
            >
              <Checkbox.Group className={styles.Checkboxlayout}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="1">1、胸闷气短可以有疗效</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="2">2、失眠、抑郁可以有疗效</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="3">3、调节心理有疗效</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="4">4、多半不会有明显差异</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="5">5、不知道</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </div>

          <Form.Item {...tailLayout}>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                上一页
              </Button>
            )}
            {current < 2 && (
              <Button type="primary" onClick={() => this.next()}>
                下一页
              </Button>
            )}
            {current === 2 && (
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default App;
