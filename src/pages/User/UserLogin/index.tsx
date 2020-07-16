import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
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
        <a className={styles.other}>修改密码</a>
      </LoginFrom>
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
