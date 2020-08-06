import { Alert, Checkbox, Modal, message } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType, modifyPassword } from './service';
import LoginFrom from './components/Login';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
interface UserLoginProps {
  dispatch: Dispatch;
  userAndUserLogin: StateType;
  submitting?: boolean;
}

const UserLogin: React.FC<UserLoginProps> = props => {
  const { userAndUserLogin = {}, submitting } = props;
  const { status, type: loginType } = userAndUserLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleModifyPwdSubmit = async (values: LoginParamsType) => {
    if (values.newPassword !== values.newPasswordConfirm) {
      message.error('两次输入的新密码不一致');
      return;
    }
    const res = await modifyPassword(values);
    if (res.code === 200) {
      setVisible(false);
      message.success('修改成功');
    } else return message.error('修改失败');
  };

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndUserLogin/login',
      payload: {
        ...values,
        type,
      },
    });
  };
  return (
    <div className={styles.main}>
      <p className={styles.logoname}>
        CLINICAL TUMOR INFORMATION MANAGEMENT SYSTEM
      </p>
      <img src={require('@/img/logo.png')} />
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <UserName
          name="account"
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
      <a className={styles.other} onClick={showModal}>
        修改密码
      </a>
      <Modal
        title="修改密码"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginFrom
          activeKey={type}
          onTabChange={setType}
          onSubmit={handleModifyPwdSubmit}
        >
          <UserName
            name="account"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <Password
            name="newPassword"
            placeholder="新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码！',
              },
            ]}
          />
          <Password
            name="newPasswordConfirm"
            placeholder="确认新密码"
            rules={[
              {
                required: true,
                message: '请再次输入新密码！',
              },
            ]}
          />
          <Submit loading={submitting}>修改</Submit>
        </LoginFrom>
      </Modal>
    </div>
  );
};

export default connect(
  ({
    userAndUserLogin,
    loading,
  }: {
    userAndUserLogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndUserLogin,
    submitting: loading.effects['userAndUserLogin/login'],
  }),
)(UserLogin);
