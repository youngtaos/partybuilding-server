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
        while (_) try {
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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var superagent_1 = __importDefault(require("superagent"));
var cheerio_1 = __importDefault(require("cheerio"));
var oldWrite = '';
var Crowller = /** @class */ (function () {
    function Crowller() {
        this.filePath = path_1.default.resolve(__dirname, '../../data/data.json');
        this.rawHtml = '';
        this.the_people = ["陈宁",
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
        this.arr = [];
        this.oldWrite = [];
        this.cnt = 178;
        this.initSpiderProcess();
        // this.the_people = the_people;
    }
    Crowller.prototype.getLiArray = function (html) {
        var _this = this;
        var $ = cheerio_1.default.load(html);
        var LiArrays = [];
        LiArrays.push($('.ny_list').children('ul').children('li'));
        LiArrays.forEach(function (item, index) {
            item.map(function (index, element) {
                var _a, _b;
                var title = $(element).find('a').attr('href');
                var aaa = (_a = title) === null || _a === void 0 ? void 0 : _a.split('/');
                var flag = $(element).find('span').text();
                if (flag.includes('智能技术与工程学院')) {
                    var ResultArr = void 0;
                    if (aaa && aaa[0] === '..') {
                        var bbb = (_b = title) === null || _b === void 0 ? void 0 : _b.split('/');
                        var articleUrl = '';
                        if (bbb) {
                            if (bbb[5]) {
                                articleUrl = "https://www.cqust.edu.cn/info/" + bbb[4] + "/" + bbb[5];
                            }
                            else if (bbb[4]) {
                                articleUrl = "https://www.cqust.edu.cn/info/" + bbb[3] + "/" + bbb[4];
                            }
                            try {
                                superagent_1.default.get(articleUrl).then(function (res) {
                                    var $ = cheerio_1.default.load(res.text);
                                    var temp = { content: '', title: '', imgSrc: '', academy: '', message: '', people: [], isReaded: false };
                                    temp.title = $('.news_ny_left h2').text();
                                    temp.message = $('.news_ny_left .message').text();
                                    temp.content = $('.news_ny_left .main').text();
                                    temp.imgSrc = "https://www.cqust.edu.cn/" + $('.news_ny_left .main img').attr('src');
                                    temp.isReaded = false;
                                    if (temp.content.includes('智能技术与工程学院')
                                        || temp.title.includes('智能技术与工程学院')) {
                                        temp.academy = '智能技术与工程学院';
                                    }
                                    _this.the_people.forEach(function (item, index) {
                                        if (temp.academy === '智能技术与工程学院' && (temp.content.includes(item)
                                            || temp.title.includes(item))) {
                                            temp.people.push(item);
                                            if (temp.isReaded === false) {
                                                _this.writeFile(temp);
                                                temp.isReaded = true;
                                            }
                                        }
                                    });
                                });
                            }
                            catch (e) { }
                        }
                    }
                }
            });
        });
    };
    Crowller.prototype.getRawHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.cnt >= 0)) return [3 /*break*/, 5];
                        url = void 0;
                        url = "https://www.cqust.edu.cn/index/xww/xxyw/" + this.cnt + ".htm";
                        if (this.cnt === 178) {
                            url = "https://www.cqust.edu.cn/index/xww/xxyw.htm";
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, superagent_1.default.get(url)];
                    case 2:
                        result = _a.sent();
                        this.rawHtml = result.text;
                        this.getLiArray(this.rawHtml);
                        this.cnt = this.cnt - 1;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 0];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Crowller.prototype.writeFile = function (content) {
        this.arr.push(content);
        Array.from(new Set(this.arr));
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(this.arr));
        return JSON.stringify(this.arr);
    };
    Crowller.prototype.initSpiderProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRawHtml()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Crowller;
}());
exports.default = Crowller;
