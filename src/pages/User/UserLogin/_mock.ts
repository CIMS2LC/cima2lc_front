// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}

export default {
  'POST  /login': (req: Request, res: Response) => {
    const { password, account, type } = req.body;
    if (password === '123456' && account === 'admin') {
      res.send({
        code: 200,
        msg: '登录成功',
        token: '123456',
      });
      return;
    }
    if (password === '123456' && account === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
