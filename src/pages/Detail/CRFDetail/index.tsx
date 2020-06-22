import React from 'react';
import styles from './index.less';
import { Menu, Button, Space, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default () => {
  return (
    <div>
      <div>
        <Button type="primary" id="btn_save">
          保存
        </Button>
        <Button type="primary" id="btn_return">
          返回
        </Button>
      </div>
      <div>
        <Menu>
          <Menu.Item>菜单项</Menu.Item>
          <SubMenu title="子菜单">
            <Menu.Item>子菜单项</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};
