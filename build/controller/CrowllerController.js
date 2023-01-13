"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var crowller_1 = __importDefault(require("../utils/crowller"));
var connection = require('../mysql/db');
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请先登录'));
    }
};
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        var the_people = ["陈宁",
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
            "晏丹",];
        new crowller_1.default();
        var position = path_1.default.resolve(__dirname, '../../data/data.json');
        var result = fs_1.default.readFileSync(position, 'utf8');
        var data = JSON.parse(result);
        connection.query("TRUNCATE TABLE Aschema ");
        data.forEach(function (item) {
            connection.query("insert into Aschema(id, content, title, imgSrc, academy, message, people) values(0,?,?,?,?,?,?);", [item.content, item.title, item.imgSrc, item.academy, item.message, JSON.stringify(item.people)], function (err, result) {
                if (err) {
                    throw err;
                }
            });
            connection.query("select count(people) as num  from aschema WHERE people like '%" + item.people + "%';", function (err, result) {
                var res = result[0];
                connection.query("update People set articleNum = ? where name like '" + item.people + "'", [res.num], function (err, result) {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
        res.json(util_1.getResponseData(true));
    };
    CrowllerController.prototype.showData = function (req, res) {
        try {
            connection.query("select * from Aschema ", function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(util_1.getResponseData(result));
                    //console.log(getResponseData(result))
                }
            });
        }
        catch (e) {
            res.json(util_1.getResponseData(false, '数据不存在'));
        }
    };
    CrowllerController.prototype.getArticleNum = function (req, res) {
        try {
            connection.query("select * from People ", function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json(util_1.getResponseData(result));
                    //console.log(getResponseData(result))
                }
            });
        }
        catch (e) {
            res.json(util_1.getResponseData(false, '数据不存在'));
        }
    };
    __decorate([
        decorator_1.get('/api/getData'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        decorator_1.get('/api/showData'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    __decorate([
        decorator_1.get('/api/getPeopleInfo'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getArticleNum", null);
    CrowllerController = __decorate([
        decorator_1.controller('/')
    ], CrowllerController);
    return CrowllerController;
}());
exports.CrowllerController = CrowllerController;
