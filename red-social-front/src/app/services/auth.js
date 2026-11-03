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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3001/auth';
    }
    login(credenciales) {
        return this.http.post(`${this.apiUrl}/login`, credenciales);
    }
    registro(datos) {
        return this.http.post(`${this.apiUrl}/registro`, datos);
    }
    guardarToken(token) {
        localStorage.setItem('token', token);
    }
    obtenerToken() {
        return localStorage.getItem('token');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.js.map