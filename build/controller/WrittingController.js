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
exports.WritingController = void 0;
const decorator_1 = require("../decorator"); // 确保有相应的装饰器
const util_1 = require("../utils/util");
const openai_1 = __importDefault(require("openai"));
let WritingController = class WritingController {
    async generateText(req, res) {
        try {
            const openai = new openai_1.default();
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful assistant." }],
                model: "gpt-3.5-turbo",
            });
        }
        catch (error) {
            console.error('Error generating text:', error);
            res.json((0, util_1.getResponseData)(false, '生成文本时出现错误'));
        }
    }
};
exports.WritingController = WritingController;
__decorate([
    (0, decorator_1.get)('/generateText'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WritingController.prototype, "generateText", null);
exports.WritingController = WritingController = __decorate([
    (0, decorator_1.controller)('/api/writing')
], WritingController);
