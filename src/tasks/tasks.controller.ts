import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

/** Start Uploads de imagens : ) */
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'node:path';
import * as fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptiors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptiors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptiors/add-header.interceptor';
/** End Uploads de imagens : ) */

export interface ITarefa{
    id: number,
    nome: string
}

@Controller('tasks')
@UseInterceptors(LoggerInterceptor)
@UseInterceptors(AddHeaderInterceptor)
export class TasksController {
    constructor(private readonly taskService: TasksService){}
    
    @Get()
    getTasks(@Query() queryParam: ITarefa){
        return this.taskService.findAll()
    }
    
    @Get("all")
    getTasks2(){
        return this.taskService.findAll()
    }

    @Get("pagination")
    getTasks3(@Query() paginationDto: PaginationDto){
        return this.taskService.findAllPagination(paginationDto)
    }

    @Get(":id")
    gindOne(@Param('id') id: number ){
        return this.taskService.findOneTask(id)
    }

    @Post()
    @UseInterceptors(BodyCreateTaskInterceptor)
    createTask(@Body() createTaskDto: CreateTaskDTO){
        return this.taskService.create(createTaskDto) 
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('upload')
    async uploadAvatar(
      @UploadedFile(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: /jpeg|jpg|png|webp/g })
            .addMaxSizeValidator({ maxSize: 3 * ( 1024 * 1024 )})
            .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
      ) file: Express.Multer.File
    ) {

        const mimeType = file.mimetype;
        const fileExtension = path.extname(file.originalname).toLocaleLowerCase().substring(1)
        
        const fileName = `${randomUUID()}.${fileExtension}`
        const fileLocalale = path.resolve(process.cwd(), 'files', fileName) // guardando imagem

        await fs.writeFile(fileLocalale, file.buffer)

        return true
 
    }

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
            const fileLocalale = path.resolve(process.cwd(), 'files', fileName) // guardando imagem
            
            await fs.writeFile(fileLocalale, file.buffer)
            /** Testes  
                console.log(fileExtension)
                console.log(fileName)
                console.log(fileLocalale)
            */
        })
        return true
 
    }

    @Patch(":id")
    updateTask( @Param("id") id: string, @Body() updateTask: UpdateTaskDTO ) {
        // return "Update: OK"
        return this.taskService.updatedTask(Number(id), updateTask)
    }

    @Delete(":id")
    deleteTask(@Param("id") id: string){
        return this.taskService.deleteTask(Number(id))
    }
}