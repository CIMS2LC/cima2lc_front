import React from 'react';
import { Tabs, Form, Divider, Radio, Rate, Input } from 'antd';
import styles from './index.less';

import LaborInspect from '../BasicComponents/LaborInspect';
import Immunohistochemical from '../BasicComponents/Immunohistochemical';
import MolecularDetection from '../BasicComponents/MolecularDetection';

const { TabPane } = Tabs;

class TreatmentInfo extends React.Component {
  render() {
    return (
      <div>
        <Tabs tabPosition="top">
          <TabPane tab="治疗记录" key="treatment_record"></TabPane>
          <TabPane tab="实验室检查" key="labor_inspect">
            <LaborInspect />
          </TabPane>
          <TabPane tab="免疫组化" key="immunohistochemical">
            <Immunohistochemical />
          </TabPane>
          <TabPane tab="分子检测" key="molecular_detection">
            <MolecularDetection />
          </TabPane>
          <TabPane tab="疗效评估" key="effect_evalution"></TabPane>
          <TabPane tab="症状体征" key="system_sign"></TabPane>
          <TabPane tab="副反应" key="side_reaction"></TabPane>
        </Tabs>
      </div>
    );
  }
}
export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-edit-cell">
      <TreatmentInfo />
    </div>
  </div>
);
