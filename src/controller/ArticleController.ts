import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/util';
const connection = require('../mysql/db')

interface BodyRequest extends Request {
    body: { [key: number]: string | undefined, [key: string]: string | undefined };
}

@controller('/api/article')
export class ArticleController {
    @get('/getPersonArticle')
    getPersonArticle(req: BodyRequest, res: Response): void {
        try {
            connection.query(`select * from Aschem  where `, function (err: any, result: any) {
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
