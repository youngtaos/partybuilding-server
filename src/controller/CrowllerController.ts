import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, use, get, post } from '../decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
const connection = require('../mysql/db')

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

export const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

@controller('/')
export class CrowllerController {
  @post('/api/getData')
  @use(checkLogin)
  async getData(req: BodyRequest, res: Response): Promise<void> {
    const defaultNames = ["陈宁", "屈治华", "胡燕", "金尚柱", "姚瑶", "于安宁", "翟渊", "彭军", "张倩", "祝华正", "冯骊骁", "都进学", "陈刘奎", "利节", "陈国荣", "周伟", "晏丹"];
    const { names = JSON.stringify(defaultNames) } = req.body;
    if (names) {
      const crowller = new Crowller(JSON.parse(names));
      // crowller.initSpiderProcess().then((ans => {
      //   console.log(ans, 'yts')
      //   res.json(getResponseData(ans));
      // })).catch((err) => {
      //   res.json(getResponseData(err))
      // })
      try {
        const ans = await crowller.initSpiderProcess()
        res.json(getResponseData(ans));
      } catch (e) {
        console.log(e)
      }
      //console.log(ans, 'yts')
    }
  }

  @post('/api/saveData')
  @use(checkLogin)
  saveData(req: BodyRequest, res: Response): void { }


  @get('/api/showData')
  showData(req: BodyRequest, res: Response): void {
    try {
      connection.query(`select * from Aschema `, function (err: unknown, result: any) {
        if (err) {
          throw err;
        } else {
          res.json(getResponseData(result));
        }
      });

    } catch (e) {
      res.json(getResponseData(false, '数据不存在'));
    }
  }
}
