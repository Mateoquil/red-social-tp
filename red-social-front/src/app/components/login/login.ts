import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credenciales = {
    correoOrUsername: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ingresar() {
    this.authService.login(this.credenciales).subscribe({
      next: (res: any) => {
        this.authService.guardarToken(res.token);
        this.router.navigate(['/feed']);
      },
      error: (err: any) => {
        alert('Error al iniciar sesión. Verificá los datos.');
      }
    });
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }
}