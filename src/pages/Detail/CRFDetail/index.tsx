import React, { useRef } from 'react';
import {
  Button,
  Layout,
  Menu,
  Tabs,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  DatePicker,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { history, Dispatch, connect } from 'umi';

import styles from './style.less';
import FollowUpInfo from './components/BasicComponents/FollowUpInfo';
import TreatmentInfo from './components/BasicComponents/TreatmentInfo';
import LaborInspect from './components/BasicComponents/LaborInspect';
import Immunohistochemical from './components/BasicComponents/Immunohistochemical';
import MolecularDetection from './components/BasicComponents/MolecularDetection';
import PreHistory from './components/BasicComponents/PreHistory';
import InitialDiagnosisProcess from './components/BasicComponents/InitialDiagnosisProcess';
import {
  Patientsave,
  Patientupdate,
  illCaseFind,
  querydetail,
} from './service';
import { StateType } from './model';
import { ActionType } from '@ant-design/pro-table';
import SearchOtherSystem from './components/BasicComponents/SearchOtherSystem';
import moment from 'moment';

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const layout = {
  labelAlign: 'left',
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

const ModelList = ['basicInfoFormKey', 'preHistory', ''];
class CRFDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state.id = props.location.query.id || -1;
    this.state.pid = props.location.query.id || -1;
    this.update_detail();
    this.setcrfDetail(this.state.isInit);
    this.update_treatment_infos();
  }
  update_treatment_infos = () => {
    if (this.state.treatment_infos.length != 0) return true;
    if (this.state.crfDetail) {
      if (this.state.crfDetail.TreRec)
        var count = this.state.crfDetail.TreRec.length;
      this.state.treNum = count;
      var treatment_infos = [];
      for (var i = 0; i < count; i++) {
        treatment_infos.push({ treNum: i + 1 });
      }
      this.state.treatment_infos = treatment_infos;
      return true;
    }
  };
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
  //各模块数据格式处理
  //1 基线信息处理
  BITranslate = (datas: any) => {
    console.log(this.state);
    console.log(datas);
    if (!datas || datas.length == 0) return {};
    var data = datas[0];
    data['birthday'] = moment(data['birthday']);
    data['gender'] = data['gender'] == 1;
    return data;
  };
  data = {};
  state = {
    value: 1,
    id: -1,
    pid: -1,
    treatment_infos: [],
    treNum: 0,
    openKeys: [],
    selectedKeys: ['baseline'],
    currTre: '',
    SORModelVisible: false,
    SORModelValue: [],
    crfDetail: undefined,
    basicInfoFormKey: 'basicInfoFormKey',
    isInit: true,
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
  setcrfDetail(isInit: boolean) {
    console.log(this.state);
    console.log(this.props.crfDetail);
    if (isInit)
      // this.setState({
      //   crfDetail:this.props.crfDetail.data
      // });
      this.state.crfDetail = this.props.crfDetail.data;
    return true;
  }
  consoleData(data: any) {
    console.log(data);
    return true;
  }
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
                this.state.crfDetail = undefined;
                this.state.isInit = true;
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
          {this.state.id == -1 ||
          (this.props.crfDetail.data != undefined &&
            //this.state.crfDetail != undefined &&
            this.setcrfDetail(this.state.isInit)) ? (
            <Layout
              className="site-layout-background"
              style={{ padding: '24px 0' }}
            >
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                  selectedKeys={this.state.selectedKeys}
                  onClick={item => {
                    this.setState({
                      selectedKeys: item.keyPath,
                    });
                  }}
                >
                  <Menu.Item key="baseline">基线资料</Menu.Item>
                  <SubMenu
                    key="treatment"
                    title="治疗信息"
                    selectedKeys={this.state.selectedKeys}
                    openKeys={this.state.openKeys}
                    onTitleClick={key => {
                      console.log(key);
                      if (this.state.openKeys.length === 0) {
                        this.setState({
                          selectedKeys: [key.key],
                          openKeys: [key.key],
                        });
                      } else {
                        this.setState({
                          selectedKeys: [key.key],
                          openKeys: [],
                        });
                      }
                    }}
                    onClick={item => {
                      if (item.key == 'add') {
                        const { treNum, treatment_infos } = this.state;
                        const newData = { treNum: treNum + 1 };
                        this.setState({
                          treNum: treNum + 1,
                          treatment_infos: [...treatment_infos, newData],
                          selectedKeys: [treNum + 1, treNum + 1],
                        });
                        (this.state.currTre = `${treNum + 1}`),
                          (item.keyPath[0] = String(treNum + 1));
                      } else {
                        console.log(this.state.currTre);
                        this.state.currTre = item.key;
                        this.setState({
                          currTre: item.key,
                        });
                        console.log(this.state.currTre);
                      }
                      this.setState({
                        selectedKeys: item.keyPath,
                      });
                    }}
                  >
                    {this.update_treatment_infos() &&
                      this.state.treatment_infos.map(v => {
                        return (
                          <Menu.Item key={v.treNum}>
                            治疗信息{v.treNum}
                          </Menu.Item>
                        );
                      })}
                    <Menu.Item key="add" icon={<PlusCircleOutlined />}>
                      添加
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="followUp">随访信息</Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {this.state.selectedKeys[0] === 'baseline' ? (
                  <Tabs tabPosition="top">
                    <TabPane tab="基本信息" key="basic_info">
                      <Form
                        key={this.state.basicInfoFormKey}
                        name="basic_info"
                        {...layout}
                        initialValues={this.BITranslate(
                          (this.state.crfDetail || {}).Patient,
                        )}
                        onFinish={async values => {
                          if (values.birthday)
                            values.birthday = values['birthday'].format(
                              'YYYY-MM-DD',
                            );
                          if (this.state.pid == -1) {
                            const res = await Patientsave({
                              id: this.state.pid,
                              treNum: this.props.treNum,
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
                              id: this.state.pid,
                              pid: this.state.pid,
                              ...values,
                            });
                            if (res.code == 200) {
                              //重新获取数据，之后将这一步合并至update的返回值中
                              this.update_detail();
                              const dataValue = `${moment(
                                new Date(),
                              ).valueOf()}`;
                              const key = `${ModelList[0]}${dataValue}`;
                              this.setState({
                                [ModelList[0]]: key,
                              });
                              console.log('更新成功');
                            } else {
                              console.log('更新失败');
                            }
                          }
                        }}
                      >
                        <Form.Item label="身份证号" name="idNumber">
                          <Input
                            maxLength={18}
                            onBlur={async e => {
                              const res = await illCaseFind({
                                key: 'idNumber',
                                value: e.target.value,
                                share_add: true,
                              });
                              if (res.code == 200) {
                                this.state.SORModelValue = res.data;
                                this.setState({ SORModelVisible: true });
                              }
                            }}
                          />
                        </Form.Item>

                        <Form.Item label="住院号/就诊号" name="hospitalNumber">
                          <Input
                            onBlur={async e => {
                              console.log(e.target.value);
                              const res = await illCaseFind({
                                key: 'hospitalNumber',
                                value: e.target.value,
                                share_add: true,
                              });
                              if (res.code == 200) {
                                this.state.SORModelValue = res.data;
                                this.setState({ SORModelVisible: true });
                              }
                            }}
                          />
                        </Form.Item>

                        <Form.Item label="姓名" name="patientName">
                          <Input
                            onBlur={async e => {
                              console.log(e.target.value);
                              const res = await illCaseFind({
                                key: 'hospitalNumber',
                                value: e.target.value,
                                share_add: true,
                              });
                              if (res.code == 200) {
                                this.state.SORModelValue = res.data;
                                this.setState({ SORModelVisible: true });
                              }
                            }}
                          />
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
                          (this.state.crfDetail || {}).pastHis
                            ? this.state.crfDetail.pastHis[0]
                            : undefined
                        }
                      />
                    </TabPane>
                    <TabPane tab="初诊过程" key="diag_procedure">
                      <InitialDiagnosisProcess
                        pid={this.state.pid}
                        initialValues={
                          (this.state.crfDetail || {}).IniDiaPro
                            ? this.state.crfDetail.IniDiaPro[0]
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
                        treNum={0}
                        initialValues={
                          (this.state.crfDetail || {}).Immunohis
                            ? this.state.crfDetail.Immunohis[0]
                            : undefined
                        }
                      />
                    </TabPane>
                    <TabPane tab="分子检测" key="molecular_detection">
                      <MolecularDetection
                        pid={this.state.pid}
                        treNum={0}
                        initialValues={
                          (this.state.crfDetail || {}).MoleDetec
                            ? this.state.crfDetail.MoleDetec[0]
                            : undefined
                        }
                      />
                    </TabPane>
                  </Tabs>
                ) : this.state.selectedKeys[0] === 'followUp' ? (
                  <div>
                    <FollowUpInfo
                      key="followUp_info"
                      pid={this.state.pid}
                      initialValues={(this.state.crfDetail || {}).FollInfo}
                    />
                  </div>
                ) : this.state.selectedKeys[0] === this.state.currTre ? (
                  <TreatmentInfo
                    key={`treatment_info${this.state.currTre}`}
                    pid={this.state.pid}
                    treNum={this.state.selectedKeys[0]}
                    initialValues={this.state.crfDetail || {}}
                  />
                ) : null}
              </Content>
            </Layout>
          ) : null}
          <SearchOtherSystem
            onCancel={() => {
              this.setState({
                SORModelVisible: false,
              });
            }}
            modalVisible={this.state.SORModelVisible}
            children={this.state.SORModelValue}
            passData={async value => {
              const res = await querydetail({ id: value.id });
              this.state.crfDetail = res.data;
              const dataValue = `${moment(new Date()).valueOf()}`;
              const key = `${ModelList[0]}${dataValue}`;
              this.state.isInit = false;
              this.setState({
                [ModelList[0]]: key,
              });
            }}
          />
        </Content>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(CRFDetail);
