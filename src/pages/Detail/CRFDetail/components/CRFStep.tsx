import { Steps, Divider } from 'antd';
import React from 'react';

const { Step } = Steps;

class CRFStep extends React.Component {
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
          <Step title="疾病史"></Step>
          <Step title="免疫组化"></Step>
          <Step title="分子检测"></Step>
          <Step title="治疗信息"></Step>
          <Step title="随访信息"></Step>
        </Steps>
      </div>
    );
  }
}

export default () => (
  <div>
    <div>
      <CRFStep />
    </div>
  </div>
);
