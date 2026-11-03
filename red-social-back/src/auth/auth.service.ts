import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  private generarToken(usuario: any) {
    return this.jwtService.sign({
      sub: usuario._id,
      perfil: usuario.perfil,
    });
  }

  async register(data: any): Promise<any> {
    try {
      const nuevoUsuario = await this.usuariosService.crearUsuario(data);

      const { password, ...usuarioLimpio } = nuevoUsuario.toObject();

      return {
        token: this.generarToken(nuevoUsuario),
        usuario: usuarioLimpio,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async login(correoOrUsername: string, password: string): Promise<any> {
    const usuario = await this.usuariosService.buscarUsuarioParaLogin(correoOrUsername);
    console.log('Usuario encontrado raw:', usuario)
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!usuario.activo) {
    throw new UnauthorizedException(
      'Tu usuario está deshabilitado. Contacta al administrador.'
    );
  }

    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const usuarioLimpio = usuario.toObject();
    delete usuarioLimpio.password;

    return {
      token: this.generarToken(usuario),
      usuario: usuarioLimpio,
    };
  }

async autorizar(token: string) {
    let datos: any;
    try {
      datos = this.jwtService.verify(token);
    } catch (e: any) {
      throw new UnauthorizedException('Token inválido o vencido');
    }

    const usuario = await this.usuariosService.obtenerUsuarioPorId(datos.sub);
    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Usuario no habilitado');
    }
    
    return usuario;
  }

  async refrescar(token: string) {
    let datos: any;
    try {
      datos = this.jwtService.verify(token);
    } catch (e: any) {
      throw new UnauthorizedException('No se pudo refrescar el token');
    }

    const usuario = await this.usuariosService.obtenerUsuarioPorId(datos.sub);
    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Usuario no habilitado');
    }

    return {
      token: this.generarToken(usuario),
    };
  }
}
