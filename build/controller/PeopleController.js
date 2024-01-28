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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleController = void 0;
require("reflect-metadata");
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var CrowllerController_1 = require("./CrowllerController");
var connection = require('../mysql/db');
var uploadAvatar = require('../multer/upload');
var images = require('images');
var PeopleController = /** @class */ (function () {
    function PeopleController() {
    }
    PeopleController.prototype.getArticleNum = function (req, res) {
        try {
            connection.query("select * from People  order by posts desc", function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json((0, util_1.getResponseData)(result));
                }
            });
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(false, '数据不存在'));
        }
    };
    PeopleController.prototype.DeletePeopleById = function (req, res) {
        var id = req.body.id;
        try {
            connection.query("delete  from People  where id = ?", [id], function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json((0, util_1.getResponseData)(result));
                }
            });
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(false, '删除失败'));
        }
    };
    PeopleController.prototype.addPeople = function (req, res) {
        var _a = req.body, name = _a.name, posts = _a.posts;
        console.log(req.body);
        try {
            connection.query("insert into People(id, name, articleNum, posts, avatar) values(?,?,?,?,?)", [null, name, 0, posts, null], function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json((0, util_1.getResponseData)(result));
                }
            });
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(false, '添加失败'));
        }
    };
    PeopleController.prototype.updatePeople = function (req, res) {
        var _a = req.body, name = _a.name, posts = _a.posts, id = _a.id;
        try {
            connection.query("update People set name=?, posts=? where id = ?", [name, posts, id], function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json((0, util_1.getResponseData)(result));
                }
            });
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(false, '添加失败'));
        }
    };
    PeopleController.prototype.getPeopleByName = function (req, res) {
        var name = req.body.name;
        try {
            connection.query("select * from People where name=".concat(name), function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.json((0, util_1.getResponseData)(result));
                }
            });
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(false, '查询失败'));
        }
    };
    // 头像图片上传
    PeopleController.prototype.upload = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadRes, img_url, personId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, uploadAvatar(req, res)];
                    case 1:
                        uploadRes = _a.sent();
                        img_url = uploadRes === null || uploadRes === void 0 ? void 0 : uploadRes.img_url;
                        personId = req.body.personId;
                        connection.query("update People set avatar=? where id = ?", [img_url, personId], function (err, result) {
                            if (err) {
                                throw err;
                            }
                            else {
                                res.json((0, util_1.getResponseData)(result));
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.send(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorator_1.get)('/getPeopleInfo'),
        (0, decorator_1.use)(CrowllerController_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PeopleController.prototype, "getArticleNum", null);
    __decorate([
        (0, decorator_1.post)('/DeletePeopleById'),
        (0, decorator_1.use)(CrowllerController_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PeopleController.prototype, "DeletePeopleById", null);
    __decorate([
        (0, decorator_1.post)('/addPeople'),
        (0, decorator_1.use)(CrowllerController_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PeopleController.prototype, "addPeople", null);
    __decorate([
        (0, decorator_1.post)('/updatePeople'),
        (0, decorator_1.use)(CrowllerController_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PeopleController.prototype, "updatePeople", null);
    __decorate([
        (0, decorator_1.post)('/getPeopleInfoByName'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PeopleController.prototype, "getPeopleByName", null);
    __decorate([
        (0, decorator_1.post)('/uploadPeopleAvatar'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], PeopleController.prototype, "upload", null);
    PeopleController = __decorate([
        (0, decorator_1.controller)('/api/people')
    ], PeopleController);
    return PeopleController;
}());
exports.PeopleController = PeopleController;
