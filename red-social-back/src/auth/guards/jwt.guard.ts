import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization']?.replace('Bearer ', '');
    
    if (!token) throw new UnauthorizedException('No enviaste token');
    
    try {
      req.user = this.jwtService.verify(token);
      return true;
    } catch (error: any) {
      throw new UnauthorizedException('Token inválido o vencido');
    }
  }
}