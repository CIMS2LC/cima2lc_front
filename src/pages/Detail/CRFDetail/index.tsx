import React from 'react';
import { Menu, Button, Space, Layout, Steps, Tabs, Form, Input } from 'antd';
//import CRFStep from './components/CRFStep';
import styles from './style.less';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;
const { TabPane } = Tabs;

class CRFLeftStep extends React.Component {
  state = {
    current: 0,
  };

  onChange = (current: any) => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  render() {
    const { current } = this.state;

    return (
      <div>
        <Steps direction="vertical" current={current} onChange={this.onChange}>
          <Step title="基本信息"></Step>
          <Step title="既往史"></Step>
          <Step title="免疫组化"></Step>
          <Step title="分子检测"></Step>
          <Step title="治疗信息"></Step>
          <Step title="随访信息"></Step>
        </Steps>
      </div>
    );
  }
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
class CRFSlidingTabs extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     mode: 'top',
  //   };
  // }

  // handleModeChange = e => {
  //   const mode = e.target.value;
  //   this.setState({ mode });
  // };

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="基线资料" key="baseline_info">
            <Tabs tabPosition="top">
              <TabPane tab="基本信息" key="basic_info">
                <Form
                  name="basic_info"
                  {...layout}
                  //className={styles.form_basic_info}
                  //initialValues={{ remember: true }}
                >
                  <Form.Item label="身份证号" name="idNumber">
                    <Input />
                  </Form.Item>

                  <Form.Item label="住院号" name="adNumber">
                    <Input />
                  </Form.Item>

                  <Form.Item label="姓名" name="name">
                    <Input />
                  </Form.Item>

                  <Form.Item label="性别" name="sex">
                    <Input />
                  </Form.Item>

                  <Form.Item label="出生日期" name="birthday">
                    <Input />
                  </Form.Item>

                  <Form.Item label="电话号码" name="phoneNumber">
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="既往史" key="pre_history"></TabPane>
              <TabPane tab="初诊过程" key="diag_procedure"></TabPane>
              <TabPane tab="实验室检查" key="labor_inspect"></TabPane>
              <TabPane tab="免疫组化" key="immunohistochemical"></TabPane>
              <TabPane tab="分子检测" key="molecular_detection"></TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="随访信息" key="followUp_info"></TabPane>
          <TabPane tab="治疗信息" key="treatment_info"></TabPane>
          {/* {[...Array(30).keys()].map(i => (
            <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
              Content of tab {i}
            </TabPane>
          ))} */}
        </Tabs>
      </div>
    );
  }
}

export default () => {
  return (
    <>
      <Layout>
        <Header>
          <div className={styles.head}>
            <div className={styles.img_logo}>
              <img
                className={styles.img_logo}
                src={require('@/img/logo.png')}
              ></img>
            </div>
            <Button className={styles.btn_return} id="btn_return">
              返回
            </Button>
          </div>
        </Header>
        <Content>
          <div>
            <CRFSlidingTabs />
          </div>
        </Content>
      </Layout>
    </>
  );
};
