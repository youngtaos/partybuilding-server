import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, use, get } from '../decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
const connection = require('../mysql/db')

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

@controller('/')
export class CrowllerController {
  @get('/api/getData')
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const the_people: Array<string> = ["陈宁",
      "裴仰军",
      "周伟",
      "陈国荣",
      "利节",
      "陈刘奎",
      "都进学",
      "冯骊骁",
      "祝华正",
      "张倩",
      "彭军",
      "翟渊",
      "于安宁",
      "姚瑶",
      "金尚柱",
      "屈治华",
      "胡燕",
      "张咪",
      "周召敏",
      "周述敏",
      "杨怡康",
      "晏丹",]
    new Crowller();
    const position = path.resolve(__dirname, '../../data/data.json');
    const result = fs.readFileSync(position, 'utf8');
    const data = JSON.parse(result);
    connection.query(`TRUNCATE TABLE Aschema `);
    data.forEach((item: any) => {
      connection.query(`insert into Aschema(id, content, title, imgSrc, academy, message, people) values(0,?,?,?,?,?,?);`,
        [item.content, item.title, item.imgSrc, item.academy, item.message, JSON.stringify(item.people)], function (err: any, result: any) {
          if (err) {
            throw err;
          }
        });
      connection.query(`select count(people) as num  from aschema WHERE people like '%${item.people}%';`, function (err: any, result: any) {
        const res = result[0];
        connection.query(`update People set articleNum = ? where name like '${item.people}'`, [res.num], function (err: any, result: any) {
          if (err) {
            throw err;
          }
        })
      })

    })

    res.json(getResponseData(true));
  }

  @get('/api/showData')
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      connection.query(`select * from Aschema `, function (err: any, result: any) {
        if (err) {
          throw err;
        } else {
          res.json(getResponseData(result));
          //console.log(getResponseData(result))
        }
      });

    } catch (e) {
      res.json(getResponseData(false, '数据不存在'));
    }
  }

  @get('/api/getPeopleInfo')
  @use(checkLogin)
  getArticleNum(req: BodyRequest, res: Response): void {
    try {
      connection.query(`select * from People `, function (err: any, result: any) {
        if (err) {
          throw err;
        } else {
          res.json(getResponseData(result));
          //console.log(getResponseData(result))
        }
      });

    } catch (e) {
      res.json(getResponseData(false, '数据不存在'));
    }
  }
}
