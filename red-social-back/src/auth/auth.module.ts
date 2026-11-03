import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CloudinaryModule } from '../config/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [
    forwardRef(() => UsuariosModule),
    CloudinaryModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('Falta JWT_SECRET en el archivo .env');
        return { secret, signOptions: { expiresIn: '15m' } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard],
  exports: [AuthService, AdminGuard, JwtModule],
})
export class AuthModule {}