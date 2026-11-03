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
exports.FeedComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const publicaciones_1 = require("../../services/publicaciones");
let FeedComponent = class FeedComponent {
    constructor(pubService, router) {
        this.pubService = pubService;
        this.router = router;
        this.publicaciones = [];
        this.nuevaPublicacion = {
            titulo: '',
            descripcion: ''
        };
        this.archivoSeleccionado = null;
    }
    ngOnInit() {
        this.cargarFeed();
    }
    cargarFeed() {
        this.pubService.obtenerPublicaciones().subscribe({
            next: (res) => {
                this.publicaciones = res.publicaciones || res;
            },
            error: (err) => {
                console.error('Error al cargar publicaciones', err);
            }
        });
    }
    onFileSelected(event) {
        this.archivoSeleccionado = event.target.files[0];
    }
    publicar() {
        const formData = new FormData();
        formData.append('titulo', this.nuevaPublicacion.titulo);
        formData.append('descripcion', this.nuevaPublicacion.descripcion);
        formData.append('autorId', '6ae1508471d4abd613abe482');
        if (this.archivoSeleccionado) {
            formData.append('file', this.archivoSeleccionado);
        }
        this.pubService.crearPublicacion(formData).subscribe({
            next: () => {
                this.nuevaPublicacion.titulo = '';
                this.nuevaPublicacion.descripcion = '';
                this.archivoSeleccionado = null;
                this.cargarFeed();
            },
            error: (err) => {
                alert('Error al crear publicación');
            }
        });
    }
    cerrarSesion() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
};
exports.FeedComponent = FeedComponent;
exports.FeedComponent = FeedComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-feed',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './feed.html',
        styleUrls: ['./feed.css']
    }),
    __metadata("design:paramtypes", [publicaciones_1.PublicacionesService, router_1.Router])
], FeedComponent);
//# sourceMappingURL=feed.js.map