import { Controller, Post, Body, Get, BadRequestException, NotFoundException, UseInterceptors, UploadedFile, Query, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicacionesService } from './publicaciones.service';
import { JwtGuard } from '../auth/guards/jwt.guard'; // <-- Asegurate de que la ruta coincida con donde guardaste tu guard

@Controller('publicaciones')
@UseGuards(JwtGuard) // <-- Protege TODAS las rutas de este controlador y extrae los datos del token
export class PublicacionesController {
    constructor(private readonly publicacionesService: PublicacionesService) {}

    // Crear publicación con imagen (opcional)
    @Post()
    @UseInterceptors(FileInterceptor('imagen')) 
    async crear(
        @UploadedFile() file: Express.Multer.File, 
        @Body() body: any,
        @Request() req: any // <-- Inyectamos la request para leer el token
    ) {
        const { titulo, descripcion } = body; 
        const autorId = req.user.sub; // <-- Lo sacamos del token, no del frontend

        if (!titulo || !descripcion) {
            throw new BadRequestException('Faltan campos obligatorios: título y descripción.');
        }
        return await this.publicacionesService.crearPublicacion(titulo, descripcion, autorId, file);
    }

    // Listar publicaciones con paginación y opción de ordenar por fecha o likes
    @Get()
    async listar(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0,
        @Query('orderBy') orderBy: 'fecha' | 'likes' = 'fecha',
        @Query('usuarioId') usuarioId?: string
    ) {
        return this.publicacionesService.obtenerPublicaciones(
            Number(limit), Number(offset), orderBy, usuarioId
        );
    }

    // Obtener publicación por ID
    @Get(':id')
    async obtenerPorId(@Param('id') publicacionId: string) {
        const publicacion = await this.publicacionesService.obtenerPublicacionPorId(publicacionId);
        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }
        return publicacion;
    }

    // Dar Me Gusta a una publicación
    @Post(':id/like')
    async darMeGusta(
        @Param('id') publicacionId: string,
        @Request() req: any
    ) {
        const autorId = req.user.sub;
        return await this.publicacionesService.darMeGusta(publicacionId, autorId);
    }

    // Quitar Me Gusta de una publicación
    @Delete(':id/like')
    async quitarMeGusta(
        @Param('id') publicacionId: string,
        @Request() req: any
    ) {
        const autorId = req.user.sub;
        return await this.publicacionesService.quitarMeGusta(publicacionId, autorId);
    }

    // Eliminación lógica de una publicación
    @Delete(':id')
    async eliminarPublicacion(
        @Param('id') publicacionId: string,
        @Request() req: any
    ) {
        // Extraemos todo directamente del token
        const usuarioPeticionId = req.user.sub;
        const perfil = req.user.perfil;

        return await this.publicacionesService.eliminarPublicacion(publicacionId, usuarioPeticionId, perfil);
    }

    // Agregar comentario a una publicación
    @Post(':id/comentarios')
    async agregarComentario(
        @Param('id') publicacionId: string,
        @Body() body: { texto: string },
        @Request() req: any
    ) {
        const autorId = req.user.sub;
        const { texto } = body;
        if (!texto) {
            throw new BadRequestException('Se requiere el texto del comentario.');
        }
        return this.publicacionesService.agregarComentario(publicacionId, autorId, texto);
    }

    // Obtener comentarios paginados
    @Get(':id/comentarios')
    async obtenerComentarios(
        @Param('id') publicacionId: string,
        @Query('limit') limit: number = 5,
        @Query('page') page: number = 1
    ) {
        const offset = (Number(page) - 1) * Number(limit);
        return this.publicacionesService.obtenerComentarios(
            publicacionId,
            Number(limit),
            offset
        );
    }

    // Editar comentario
    @Put('comentarios/:comentarioId')
    async editarComentario(
        @Param('comentarioId') comentarioId: string,
        @Body() body: { texto: string },
        @Request() req: any
    ) {
        const autorId = req.user.sub;
        const { texto } = body;
        if (!texto) {
            throw new BadRequestException('El texto es obligatorio');
        }

        return this.publicacionesService.editarComentario(comentarioId, autorId, texto);
    }

    // Eliminar comentario
    @Delete('comentarios/:comentarioId')
    async eliminarComentario(
        @Param('comentarioId') comentarioId: string,
        @Request() req: any
    ) {
        const autorId = req.user.sub;
        return this.publicacionesService.eliminarComentario(comentarioId, autorId);
    }
}



