import 'reflect-metadata';
import { Request, Response, NextFunction, request } from 'express';
import { controller, use, get, post } from '../decorator';
import { getResponseData } from '../utils/util';
import { checkLogin } from './CrowllerController';
const connection = require('../mysql/db');
const uploadAvatar = require('../multer/upload');
const images = require('images');

export interface BodyRequest extends Request {
    body: { [key: string]: string | undefined };
}

export interface PeopleInfoType {
    id: number;
    name: string;
    articleNum: number;
    posts: number;
}

@controller('/api/people')
export class PeopleController {
    @get('/getPeopleInfo')
    @use(checkLogin)
    getArticleNum(req: BodyRequest, res: Response): void {
        try {
            connection.query(`select * from People  order by posts desc`, function (err: any, result: any) {
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

    @post('/DeletePeopleById')
    @use(checkLogin)
    DeletePeopleById(req: BodyRequest, res: Response): void {
        const { id } = req.body;
        try {
            connection.query(`delete  from People  where id = ?`, [id], function (err: any, result: any) {
                if (err) {
                    throw err;
                } else {
                    res.json(getResponseData(result));
                }
            });

        } catch (e) {
            res.json(getResponseData(false, '删除失败'));
        }
    }

    @post('/addPeople')
    @use(checkLogin)
    addPeople(req: BodyRequest, res: Response): void {
        const { name, posts } = req.body;
        console.log(req.body);
        try {
            connection.query(`insert into People(id, name, articleNum, posts, avatar) values(?,?,?,?,?)`, [null, name, 0, posts, null], function (err: any, result: any) {
                if (err) {
                    throw err;
                } else {
                    res.json(getResponseData(result));
                }
            });

        } catch (e) {
            res.json(getResponseData(false, '添加失败'));
        }
    }

    @post('/updatePeople')
    @use(checkLogin)
    updatePeople(req: BodyRequest, res: Response): void {
        const { name, posts, id } = req.body;
        try {
            connection.query(`update People set name=?, posts=? where id = ?`, [name, posts, id], function (err: any, result: any) {
                if (err) {
                    throw err;
                } else {
                    res.json(getResponseData(result));
                }
            });

        } catch (e) {
            res.json(getResponseData(false, '添加失败'));
        }
    }

    @post('/getPeopleInfoByName')
    getPeopleByName(req: BodyRequest, res: Response): void {
        const { name } = req.body;
        try {
            connection.query(`select * from People where name=${name}`, function (err: any, result: any) {
                if (err) {
                    throw err;
                } else {
                    res.json(getResponseData(result));
                }
            });

        } catch (e) {
            res.json(getResponseData(false, '查询失败'));
        }
    }

    // 头像图片上传
    @post('/uploadPeopleAvatar')
    async upload(req: BodyRequest, res: Response) {
        try {
            const uploadRes = await uploadAvatar(req, res);
            const img_url = uploadRes?.img_url;
            const { personId } = req.body;
            connection.query(`update People set avatar=? where id = ?`, [img_url, personId], function (err: any, result: any) {
                if (err) {
                    throw err;
                } else {
                    res.json(getResponseData(result));
                }
            });

        } catch (error) {
            res.send(error)
        }
    }

}