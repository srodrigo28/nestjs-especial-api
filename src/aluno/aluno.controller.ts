import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { AlunoService } from './aluno.service';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'node:crypto';
import * as fs from 'node:fs/promises'
import * as path from 'node:path';

/** Start Uploads de imagens : ) 
 * 1. UseInterceptors, UploadedFile, UploadedFiles
 * 2. FileInterceptor, FilesInterceptor,
 * 3. randomUUID,
 * 4. fs
 * 5. path
 * End Uploads de imagens : ) */

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  /** Upload de Unica Imagem por vez */
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File
  ) {
      // console.log(file);
      const mimeType = file.mimetype;
      const fileExtension = path.extname(file.originalname).toLocaleLowerCase().substring(1)      
      const fileName = `${randomUUID()}.${fileExtension}`
      const fileLocalale = path.resolve(process.cwd(), 'files_aluno', fileName) // guardando imagem
      
      await fs.writeFile(fileLocalale, file.buffer)

      return true
  }

  /** Uploads de multplas imagens */
  @UseInterceptors(FilesInterceptor('file'))
  @Post('uploads')
  async uploadMult(
    @UploadedFiles(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: /jpeg|jpg|png|webp/g })
      .addMaxSizeValidator({ maxSize: 3 * ( 1024 * 1024 )})
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
    ) files: Array<Express.Multer.File>
  ) {
      // console.log(file);
      files.forEach(async file => {
          const fileExtension = path.extname(file.originalname).toLocaleLowerCase().substring(1)
          const fileName = `${randomUUID()}.${fileExtension}`
          const fileLocalale = path.resolve(process.cwd(), 'files_aluno', fileName) // guardando imagem
          
          await fs.writeFile(fileLocalale, file.buffer)
      })
      return true
  }
}