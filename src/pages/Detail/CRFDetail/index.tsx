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
} from 'antd';
import { history, Dispatch, connect } from 'umi';

import styles from './style.less';
import FollowUpInfo from './components/BasicComponents/FollowUpInfo';
import TreatmentInfo from './components/BasicComponents/TreatmentInfo';
import LaborInspect from './components/BasicComponents/LaborInspect';
import Immunohistochemical from './components/BasicComponents/Immunohistochemical';
import MolecularDetection from './components/BasicComponents/MolecularDetection';
import PreHistory from './components/BasicComponents/PreHistory';
import InitialDiagnosisProcess from './components/BasicComponents/InitialDiagnosisProcess';
import { Patientsave, Patientupdate } from './service';
import { StateType } from './model';

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};

const mapStateToProps = (values: StateType) => {
  return { ...values };
};

class CRFDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state.id = props.location.query.id || -1;
    this.state.pid = props.location.query.id || -1;
    this.update_detail();
  }
  update_detail = () => {
    const id = this.state.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'crfDetail/detail',
      payload: {
        id,
      },
    });
  };
  data = {};
  state = {
    value: 1,
    id: -1,
    pid: -1,
  };
  idNumber_onChange = (value: any) => {
    console.log('changed', value);
  };
  sex_onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            background: 1677215,
          }}
        >
          <div>
            <img className={styles.img_logo} src={require('@/img/logo.png')} />
            <Button
              className={styles.btn_return}
              id="btn_return"
              onClick={() => {
                this.props.crfDetail.data = undefined;
                history.push('/list/fuv_list');
              }}
            >
              返回
            </Button>
          </div>
        </Header>
        <Content
          style={{
            padding: '0 50px',
            marginTop: 64,
          }}
        >
          {this.props.crfDetail.data || this.state.id == -1 ? (
            <Tabs defaultActiveKey="1" tabPosition="left">
              <TabPane tab="基线资料" key="baseline_info">
                <Tabs tabPosition="top">
                  <TabPane tab="基本信息" key="basic_info">
                    <Form
                      name="basic_info"
                      {...layout}
                      initialValues={
                        this.props.crfDetail.data
                          ? this.props.crfDetail.data.Patient
                          : undefined
                      }
                      onFinish={async values => {
                        if (values.birthday)
                          values.birthday = values['birthday'].format(
                            'YYYY-MM-DD',
                          );
                        if (this.state.id == -1) {
                          const res = await Patientsave({
                            id: this.state.id,
                            ...values,
                          });
                          this.update_detail();
                          if (res.code == 200) {
                            this.setState({ pid: res.id });
                            console.log('提交成功');
                          } else {
                            console.log('提交失败');
                          }
                        } else {
                          const res = await Patientupdate({
                            id: this.state.id,
                            pid: this.state.pid,
                            ...values,
                          });
                          if (res.code == 200) {
                            console.log('更新成功');
                          } else {
                            console.log('更新失败');
                          }
                        }
                      }}
                    >
                      <Form.Item label="身份证号" name="idNumber">
                        <Input maxLength={18} />
                      </Form.Item>

                      <Form.Item label="住院号/就诊号" name="hospitalNumber">
                        <Input />
                      </Form.Item>

                      <Form.Item label="姓名" name="patientName">
                        <Input />
                      </Form.Item>

                      <Form.Item label="性别" name="gender">
                        <Radio.Group
                          onChange={this.sex_onChange}
                          value={this.state.value}
                        >
                          <Radio value={true}>男</Radio>
                          <Radio value={false}>女</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item label="出生日期" name="birthday">
                        <DatePicker />
                      </Form.Item>

                      <Form.Item label="电话号码（必填）" name="phoneNumber1">
                        <Input />
                      </Form.Item>

                      <Form.Item label="电话号码（选填）" name="phoneNumber2">
                        <Input />
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          保存
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                  <TabPane tab="既往史" key="pre_history">
                    <PreHistory
                      pid={this.state.pid}
                      initialValues={
                        this.props.crfDetail.data
                          ? this.props.crfDetail.data.pastHis[0]
                          : undefined
                      }
                    />
                  </TabPane>
                  <TabPane tab="初诊过程" key="diag_procedure">
                    <InitialDiagnosisProcess
                      pid={this.state.pid}
                      initialValues={
                        this.props.crfDetail.data
                          ? this.props.crfDetail.data.IniDiaPro[0]
                          : undefined
                      }
                    />
                  </TabPane>
                  <TabPane tab="实验室检查" key="labor_inspect">
                    <LaborInspect pid={this.state.pid} />
                  </TabPane>
                  <TabPane tab="免疫组化" key="immunohistochemical">
                    <Immunohistochemical
                      pid={this.state.pid}
                      initialValues={
                        this.props.crfDetail.data
                          ? this.props.crfDetail.data.Immunohis[0]
                          : undefined
                      }
                    />
                  </TabPane>
                  <TabPane tab="分子检测" key="molecular_detection">
                    <MolecularDetection
                      pid={this.state.pid}
                      initialValues={
                        this.props.crfDetail.data
                          ? this.props.crfDetail.data.MoleDetec[0]
                          : undefined
                      }
                    />
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab="随访信息" key="followUp_info">
                <FollowUpInfo />
              </TabPane>
              <TabPane tab="治疗信息" key="treatment_info">
                <TreatmentInfo />
              </TabPane>
            </Tabs>
          ) : null}
        </Content>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(CRFDetail);
