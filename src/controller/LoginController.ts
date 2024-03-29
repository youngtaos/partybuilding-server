import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/util';
// import OpenAI from 'openai';
import 'dotenv/config'



interface BodyRequest extends Request {
  body: { [key: number]: string | undefined, [key: string]: string | undefined };
}

@controller('/')
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get('/api/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    res.json(getResponseData(isLogin));
  }

  @post('/api/login')
  login(req: BodyRequest, res: Response): void {
    const { username, password } = req.body;
    const isLogin = LoginController.isLogin(req);
    if (username === '123' && password === '123' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, '登陆失败'));
    }
  }

  @get('/api/logout')
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }



  @get('/')
  home(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    if (isLogin) {
      res.send(`
      <html>
        <body>
          <a href='/getData'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>
      </html>
    `);
    } else {
      res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="username" name="username" />
            <input type="password" name="password" />
            <button>登陆</button>
          </form>
        </body>
      </html>
    `);
    }
  }
}
