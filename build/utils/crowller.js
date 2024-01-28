"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var superagent_1 = __importDefault(require("superagent"));
var cheerio_1 = __importDefault(require("cheerio"));
var schedule = require('node-schedule');
var connection = require('../mysql/db');
var Crowller = /** @class */ (function () {
    function Crowller(the_people) {
        this.the_people = the_people;
        this.rawHtml = '';
        this.arr = [];
        this.isfinished = false;
        this.cnt = 180;
        this.point = 'xxyw.htm';
        this.the_people = the_people;
    }
    Crowller.prototype.getLiArray = function (html) {
        var _this = this;
        var $ = cheerio_1.default.load(html);
        var LiArrays = [];
        LiArrays.push($('.ny_list').children('ul').children('li'));
        LiArrays.forEach(function (item, index) {
            item.map(function (index, element) {
                var title = $(element).find('a').attr('href');
                var aaa = title === null || title === void 0 ? void 0 : title.split('/');
                var flag = $(element).find('span').text();
                if (flag.includes('智能技术与工程学院')) {
                    if (aaa && aaa[0] === '..') {
                        var bbb = title === null || title === void 0 ? void 0 : title.split('/');
                        var articleUrl_1 = '';
                        if (bbb) {
                            if (bbb[5]) {
                                articleUrl_1 = "https://www.cqust.edu.cn/info/".concat(bbb[4], "/").concat(bbb[5]);
                            }
                            else if (bbb[4]) {
                                articleUrl_1 = "https://www.cqust.edu.cn/info/".concat(bbb[3], "/").concat(bbb[4]);
                            }
                            try {
                                superagent_1.default.get(articleUrl_1).then(function (res) {
                                    var $ = cheerio_1.default.load(res.text);
                                    var temp = { content: '', title: '', imgSrc: '', academy: '', message: '', people: [], isReaded: false, articleUrl: '' };
                                    temp.title = $('.news_ny_left h2').text();
                                    temp.message = $('.news_ny_left .message').text();
                                    temp.content = $('.news_ny_left .main').text() || '';
                                    temp.imgSrc = "https://www.cqust.edu.cn/".concat($('.news_ny_left .main img').attr('src'));
                                    temp.isReaded = false;
                                    temp.articleUrl = articleUrl_1;
                                    if (temp.content.includes('智能技术与工程学院')
                                        || temp.title.includes('智能技术与工程学院')) {
                                        temp.academy = '智能技术与工程学院';
                                    }
                                    _this.the_people.forEach(function (item, index) {
                                        if (temp.academy === '智能技术与工程学院' && (temp.content.includes(item)
                                            || temp.title.includes(item))) {
                                            temp.people.push(item);
                                            if (temp.isReaded === false) {
                                                _this.arr.push(temp);
                                                temp.isReaded = true;
                                            }
                                        }
                                    });
                                }).catch(function (e) {
                                    throw (e);
                                });
                            }
                            catch (e) {
                                throw (e);
                            }
                        }
                    }
                }
            });
        });
        return this.arr;
    };
    Crowller.prototype.getRawHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, $, point, rule;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get("https://www.cqust.edu.cn/index/xww/xxyw.htm")];
                    case 1:
                        result = _a.sent();
                        this.rawHtml = result.text;
                        $ = cheerio_1.default.load(this.rawHtml);
                        this.getLiArray(this.rawHtml);
                        point = $('.ny_list').children('div').children('span').find('.p_next').find('a').attr('href');
                        this.cnt = parseInt(point.split('/')[1].split('.')[0]);
                        rule = new schedule.RecurrenceRule();
                        rule.second = [0, 10, 20, 30, 40, 50];
                        console.log('开始爬取123');
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var url, result_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(this.cnt >= 1)) return [3 /*break*/, 2];
                                            url = "https://www.cqust.edu.cn/index/xww/xxyw/".concat(this.cnt, ".htm");
                                            return [4 /*yield*/, superagent_1.default.get(url)];
                                        case 1:
                                            result_1 = _a.sent();
                                            this.rawHtml = result_1.text;
                                            this.getLiArray(this.rawHtml);
                                            console.log(this.cnt);
                                            this.cnt = this.cnt - 1;
                                            return [3 /*break*/, 0];
                                        case 2:
                                            console.log('爬取成功123');
                                            resolve("success");
                                            this.writeFile();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    Crowller.prototype.writeFile = function () {
        Array.from(new Set(this.arr));
        connection.query("TRUNCATE TABLE Aschema ");
        this.arr.forEach(function (item) {
            connection.query("insert into Aschema(id, content, title, imgSrc, academy, message, people, articleUrl) values(0,?,?,?,?,?,?,?);", [item.content, item.title, item.imgSrc, item.academy, item.message, JSON.stringify(item.people), item.articleUrl], function (err, result) {
                if (err) {
                    throw err;
                }
            });
            connection.query("select count(people) as num  from aschema WHERE people like '%".concat(item.people, "%';"), function (err, result) {
                var res = result[0];
                connection.query("update People set articleNum = ? where name like '".concat(item.people, "'"), [res.num], function (err, result) {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
    };
    Crowller.prototype.initSpiderProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.getRawHtml().then(function () {
                            _this.isfinished = true;
                            resolve(_this.arr);
                        });
                    })];
            });
        });
    };
    Crowller.prototype.getAns = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.arr];
            });
        });
    };
    return Crowller;
}());
exports.default = Crowller;
