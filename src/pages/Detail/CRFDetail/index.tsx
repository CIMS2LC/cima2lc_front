import React from 'react';
import { Menu, Button, Space, Layout, Steps } from 'antd';
import CRFStep from './components/CRFStep';
import styles from './style.less';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;

export default () => {
  return (
    <>
      <Layout>
        <Header></Header>
        <Layout>
          <Sider theme="light">
            <div>
              <div className={styles.img_logo}>
                <img
                  className={styles.img_logo}
                  src={require('@/img/logo.png')}
                ></img>
              </div>
              <CRFStep />
            </div>
          </Sider>
          <Content>
            <Button id="save">保存</Button>
            <Button id="return">返回</Button>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
