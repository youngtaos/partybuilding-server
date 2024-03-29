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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowllerController = exports.checkLogin = void 0;
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
        res.json((0, util_1.getResponseData)(null, '请先登录'));
    }
};
exports.checkLogin = checkLogin;
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultNames, _a, names, crowller, ans, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        defaultNames = ["陈宁", "屈治华", "胡燕", "金尚柱", "姚瑶", "于安宁", "翟渊", "彭军", "张倩", "祝华正", "冯骊骁", "都进学", "陈刘奎", "利节", "陈国荣", "周伟", "晏丹"];
                        _a = req.body.names, names = _a === void 0 ? JSON.stringify(defaultNames) : _a;
                        if (!names) return [3 /*break*/, 4];
                        crowller = new crowller_1.default(JSON.parse(names));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, crowller.initSpiderProcess()];
                    case 2:
                        ans = _b.sent();
                        res.json((0, util_1.getResponseData)(ans));
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CrowllerController.prototype.saveData = function (req, res) { };
    CrowllerController.prototype.showData = function (req, res) {
        try {
            connection.query("select * from Aschema ", function (err, result) {
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
    __decorate([
        (0, decorator_1.post)('/api/getData'),
        (0, decorator_1.use)(exports.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        (0, decorator_1.post)('/api/saveData'),
        (0, decorator_1.use)(exports.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "saveData", null);
    __decorate([
        (0, decorator_1.get)('/api/showData'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        (0, decorator_1.controller)('/')
    ], CrowllerController);
    return CrowllerController;
}());
exports.CrowllerController = CrowllerController;
