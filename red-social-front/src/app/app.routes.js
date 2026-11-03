"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const login_component_1 = require("./components/login/login.component");
const registro_component_1 = require("./components/registro/registro.component");
const feed_component_1 = require("./components/feed/feed.component");
exports.routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'registro', component: registro_component_1.RegistroComponent },
    { path: 'feed', component: feed_component_1.FeedComponent }
];
//# sourceMappingURL=app.routes.js.map