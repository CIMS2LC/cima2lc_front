import React from 'react';
import {
  Tabs,
  Form,
  Divider,
  Radio,
  Rate,
  Input,
  Button,
  Select,
  TimePicker,
  DatePicker,
  Checkbox,
  InputNumber,
  Switch,
  Popconfirm,
} from 'antd';
import styles from './index.less';

import LaborInspect from './LaborInspect';
import Immunohistochemical from './Immunohistochemical';
import MolecularDetection from './MolecularDetection';
import SideReaction from './SideReaction';
import SystemSign from './SystemSign';
import TreatmentRecord from './TreatmentRecord';
import EffectEvalution from './EffectEvalution';
import OtherInspect from './OtherInspect';
const { TabPane } = Tabs;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};

class TreatmentInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.treNum);
    this.update();
  }
  update = () => {
    this.treNum = this.props.treNum;
    if (this.props.initialValues) {
      var sideEffectList = [];
      var signList = [];
      this.props.initialValues.SideEffect.map(item => {
        if (item.treNum == this.props.treNum) {
          sideEffectList.push(item);
        }
      });
      this.props.initialValues.Signs.map(item => {
        if (item.treNum == this.props.treNum) {
          signList.push(item);
        }
      });
      this.state.sideEffectList = sideEffectList;
      this.state.signList = signList;
      this.setState({ sideEffectList, signList });
    }
    return true;
  };
  treNumOnchange = () => {
    if (this.treNum != this.props.treNum) {
      console.log(this.treNum);
      console.log(this.props.treNum);
      this.update();
      this.treNum = this.props.treNum;
    }
    return true;
  };
  treNum = '';
  state = {
    signList: [],
    sideEffectList: [],
  };

  render() {
    return this.treNumOnchange() ? (
      <div>
        <Tabs tabPosition="top">
          <TabPane tab="治疗记录" key="treatment_record">
            <TreatmentRecord
              treNum={this.props.treNum}
              pid={this.props.pid}
              initialValues={this.props.initialValues}
            />
          </TabPane>

          <TabPane tab="实验室检查" key="labor_inspect">
            <LaborInspect
              pid={this.props.pid}
              treNum={this.props.treNum}
              BloodRoutine={
                this.props.initialValues
                  ? this.props.initialValues.BloodRoutine[this.props.treNum]
                  : {}
              }
              BloodBio={
                this.props.initialValues
                  ? this.props.initialValues.BloodBio[this.props.treNum]
                  : {}
              }
              Thyroid={
                this.props.initialValues
                  ? this.props.initialValues.Thyroid[this.props.treNum]
                  : {}
              }
              Coagulation={
                this.props.initialValues
                  ? this.props.initialValues.Coagulation[this.props.treNum]
                  : {}
              }
              MyocardialEnzyme={
                this.props.initialValues
                  ? this.props.initialValues.MyocardialEnzyme[this.props.treNum]
                  : {}
              }
              Cytokines={
                this.props.initialValues
                  ? this.props.initialValues.Cytokines[this.props.treNum]
                  : {}
              }
              LymSubsets={
                this.props.initialValues
                  ? this.props.initialValues.LymSubsets[this.props.treNum]
                  : {}
              }
              UrineRoutine={
                this.props.initialValues
                  ? this.props.initialValues.UrineRoutine[this.props.treNum]
                  : {}
              }
              TumorMarker={
                this.props.initialValues
                  ? this.props.initialValues.TumorMarker[this.props.treNum]
                  : {}
              }
            />
          </TabPane>
          <TabPane tab="其他检查" key="other_inspect">
            <OtherInspect
              pid={this.state.pid}
              treNum={this.props.treNum}
              Lung={
                this.props.initialValues
                  ? this.props.initialValues.Lung[this.props.treNum]
                  : {}
              }
              OtherExams={
                this.props.initialValues
                  ? this.props.initialValues.OtherExams[this.props.treNum]
                  : {}
              }
              ImageExams={
                this.props.initialValues
                  ? this.props.initialValues.ImageExams[this.props.treNum]
                  : {}
              }
            />
          </TabPane>
          <TabPane tab="免疫组化" key="immunohistochemical">
            <Immunohistochemical
              pid={this.props.pid}
              treNum={this.props.treNum}
              initialValues={
                this.props.initialValues
                  ? this.props.initialValues.Immunohis[this.props.treNum]
                  : {}
              }
            />
          </TabPane>
          <TabPane tab="分子检测" key="molecular_detection">
            <MolecularDetection
              pid={this.props.pid}
              treNum={this.props.treNum}
              initialValues={
                this.props.initialValues
                  ? this.props.initialValues.MoleDetec[this.props.treNum]
                  : {}
              }
            />
          </TabPane>
          <TabPane tab="症状体征" key="system_sign">
            <SystemSign
              pid={this.props.pid}
              treNum={this.props.treNum}
              initialValues={this.state.signList}
            />
          </TabPane>
          <TabPane tab="副反应" key="side_reaction">
            <SideReaction
              pid={this.props.pid}
              treNum={this.props.treNum}
              initialValues={this.state.sideEffectList}
            />
          </TabPane>
        </Tabs>
      </div>
    ) : null;
  }
}
export default TreatmentInfo;
