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
exports.RegistroComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const auth_1 = require("../../services/auth");
let RegistroComponent = class RegistroComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.usuario = {
            nombre: '',
            apellido: '',
            correo: '',
            username: '',
            password: '',
            fechaNacimiento: '',
            descripcion: ''
        };
        this.archivoSeleccionado = null;
        this.mensajeError = '';
    }
    onFileSelected(event) {
        this.archivoSeleccionado = event.target.files[0];
    }
    registrar() {
        this.mensajeError = '';
        const formData = new FormData();
        formData.append('nombre', this.usuario.nombre);
        formData.append('apellido', this.usuario.apellido);
        formData.append('correo', this.usuario.correo);
        formData.append('username', this.usuario.username);
        formData.append('password', this.usuario.password);
        formData.append('fechaNacimiento', this.usuario.fechaNacimiento);
        formData.append('descripcion', this.usuario.descripcion);
        if (this.archivoSeleccionado) {
            formData.append('file', this.archivoSeleccionado);
        }
        this.authService.registro(formData).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.mensajeError = 'Error al registrar. Verificá que los datos estén completos.';
            }
        });
    }
    volver() {
        this.router.navigate(['/login']);
    }
};
exports.RegistroComponent = RegistroComponent;
exports.RegistroComponent = RegistroComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-registro',
        standalone: true,
        imports: [forms_1.FormsModule, common_1.CommonModule],
        templateUrl: './registro.html',
        styleUrls: ['./registro.css']
    }),
    __metadata("design:paramtypes", [auth_1.AuthService, router_1.Router])
], RegistroComponent);
//# sourceMappingURL=registro.js.map