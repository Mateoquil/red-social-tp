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
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const auth_1 = require("../../services/auth");
let LoginComponent = class LoginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.credenciales = {
            correoOrUsername: '',
            password: ''
        };
    }
    ingresar() {
        this.authService.login(this.credenciales).subscribe({
            next: (res) => {
                this.authService.guardarToken(res.token);
                this.router.navigate(['/feed']);
            },
            error: (err) => {
                alert('Error al iniciar sesión. Verificá los datos.');
            }
        });
    }
    irAlRegistro() {
        this.router.navigate(['/registro']);
    }
};
exports.LoginComponent = LoginComponent;
exports.LoginComponent = LoginComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-login',
        standalone: true,
        imports: [forms_1.FormsModule],
        templateUrl: './login.html',
        styleUrls: ['./login.css']
    }),
    __metadata("design:paramtypes", [auth_1.AuthService, router_1.Router])
], LoginComponent);
//# sourceMappingURL=login.js.map