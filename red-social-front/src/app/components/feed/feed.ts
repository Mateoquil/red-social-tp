import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionesService } from '../../services/publicaciones';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent implements OnInit {
  publicaciones: any[] = [];
  nuevaPublicacion = {
    titulo: '',
    descripcion: ''
  };
  archivoSeleccionado: File | null = null;

  constructor(private pubService: PublicacionesService, private router: Router) {}

  ngOnInit(): void {
    this.cargarFeed();
  }

  cargarFeed() {
    this.pubService.obtenerPublicaciones().subscribe({
      next: (res: any) => {
        this.publicaciones = res.publicaciones || res;
      },
      error: (err: any) => {
        console.error('Error al cargar publicaciones', err);
      }
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

publicar() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }
  const payload = JSON.parse(
    atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
  );

  const formData = new FormData();
  formData.append('titulo', this.nuevaPublicacion.titulo);
  formData.append('descripcion', this.nuevaPublicacion.descripcion);
  formData.append('autorId', payload.sub);

  if (this.archivoSeleccionado) {
    formData.append('imagen', this.archivoSeleccionado);
  }

  this.pubService.crearPublicacion(formData).subscribe({
    next: () => {
      this.nuevaPublicacion.titulo = '';
      this.nuevaPublicacion.descripcion = '';
      this.archivoSeleccionado = null;
      this.cargarFeed();
    },
    error: (err: any) => console.error('Respuesta del back:', err.error)
  });
}

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}