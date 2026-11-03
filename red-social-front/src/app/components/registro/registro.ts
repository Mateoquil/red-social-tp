import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Ajustá el nombre si le dejaste .service

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html', // Ajustá a .component.html si lo renombraste
  styleUrls: ['./registro.css']   // Ajustá a .component.css si lo renombraste
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    username: '',
    password: '',
    fechaNacimiento: '',
    descripcion: ''
  };
  
  archivoSeleccionado: File | null = null;
  mensajeError = '';

  constructor(private authService: AuthService, private router: Router) {}

  onFileSelected(event: any) {
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
  formData.append('imagenPerfil', this.archivoSeleccionado);
  }

    this.authService.registro(formData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
      console.log(err.error);
      const msg = err.error?.message;
      this.mensajeError = Array.isArray(msg) ? msg.join(', ') : (msg || 'Error al registrar.');
      }
    });
  }

  volver() {
    this.router.navigate(['/login']);
  }
}