import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { CloudinaryModule } from './config/cloudinary.module'; 

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsuariosModule,
    PublicacionesModule,
    CloudinaryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}