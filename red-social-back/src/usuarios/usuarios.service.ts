import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { Usuario } from "./schemas/usuario.schema";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async crearUsuario(data: any): Promise<Usuario> {
    const nombre = data.get ? data.get("nombre") : data.nombre;
    const apellido = data.get ? data.get("apellido") : data.apellido;
    const correo = data.get ? data.get("correo") : data.correo;
    const username = data.get ? data.get("username") : data.username;
    const password = data.get ? data.get("password") : data.password;
    const fechaNacimiento = data.get ? data.get("fechaNacimiento") : data.fechaNacimiento;
    const descripcion = data.get ? data.get("descripcion") : data.descripcion;
    const imagenPerfil = data.get ? data.get("imagenPerfil") : data.imagenPerfil;
    const perfil = data.get ? data.get("perfil") : data.perfil;

    // Validación de contraseña
    if (!password || !this.validarPassword(password)) {
      throw new BadRequestException(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
      );
    }

    // Validar unicidad
    const [correoExistente, usernameExistente] = await Promise.all([
      this.usuarioModel.findOne({ correo }),
      this.usuarioModel.findOne({ username }),
    ]);

    if (correoExistente) {
      throw new BadRequestException("El correo ya está registrado");
    }
    if (usernameExistente) {
      throw new BadRequestException("El nombre de usuario ya está registrado");
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // Determinar perfil final (corregido a 'administrador')
    const perfilFinal = perfil === "administrador" ? "administrador" : "usuario";

    // Crear y guardar
    const nuevoUsuario = new this.usuarioModel({
      nombre,
      apellido,
      correo,
      username,
      password: hash,
      fechaNacimiento,
      descripcion,
      imagenPerfil,
      perfil: perfilFinal,
      activo: true,
    });

    return nuevoUsuario.save();
  }

  // Busca un usuario por correo o nombre de usuario (para login)
  async buscarUsuarioParaLogin(
    correoOrUsername: string,
  ): Promise<Usuario | null> {
    return this.usuarioModel
      .findOne({
        $or: [{ correo: correoOrUsername }, { username: correoOrUsername }],
      })
      .exec();
  }

  // Valida que la contraseña tenga al menos una mayúscula, un número y 8 caracteres
  private validarPassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  // Devuelve todos los usuarios (corregido para ocultar el hash de la contraseña)
  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuarioModel.find().select('-password').exec();
  }

  // Busca un usuario por su ID (corregido para ocultar el hash de la contraseña)
  async obtenerUsuarioPorId(id: string): Promise<Usuario | null> {
    return this.usuarioModel.findById(id).select('-password').exec();
  }

// Deshabilitar usuario
  async deshabilitarUsuario(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    ).select('-password'); // <-- Agregado acá
    
    if (!usuario) throw new BadRequestException("Usuario no encontrado");
    return usuario;
  }

  // Habilitar usuario
  async habilitarUsuario(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findByIdAndUpdate(
      id,
      { activo: true },
      { new: true },
    ).select('-password'); // <-- Agregado acá
    
    if (!usuario) throw new BadRequestException("Usuario no encontrado");
    return usuario;
  }
}