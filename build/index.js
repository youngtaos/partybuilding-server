"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrowllerController");
require("./controller/PeopleController");
require("./controller/ArticleController");
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['yts'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(router_1.default);
app.use('/public/', express_1.default.static('./public/'));
app.listen(7001, function () {
    console.log('server is running');
});
