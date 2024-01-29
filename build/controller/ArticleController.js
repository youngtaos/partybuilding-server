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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var connection = require('../mysql/db');
var ArticleController = /** @class */ (function () {
    function ArticleController() {
    }
    ArticleController.prototype.getPersonArticle = function (req, res) {
        var name = req.body.name;
        try {
            connection.query("SELECT * from aschema where people  LIKE '%".concat(name, "%' "), function (err, result) {
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
        (0, decorator_1.post)('/getPersonArticle'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ArticleController.prototype, "getPersonArticle", null);
    ArticleController = __decorate([
        (0, decorator_1.controller)('/api/article')
    ], ArticleController);
    return ArticleController;
}());
exports.ArticleController = ArticleController;
