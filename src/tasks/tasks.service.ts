import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class TasksService {
    constructor( private readonly prisma: PrismaService){}
    
   // filterCompleted = this.tasks.find(task => task.completed === true )
    
    async findAll(){
        const allTasks = await this.prisma.task.findMany({
            orderBy: { name: "desc" }
        });

        if ( allTasks.length > 0 ) return allTasks;
        else throw new HttpException( "Sem registros. ", HttpStatus.NOT_FOUND )
    }
    async findAllPagination(paginationDto: PaginationDto){
        const { limit= 10, offset = 0 } = paginationDto;
     
        const allTasks = await this.prisma.task.findMany({
            take: limit,
            skip: offset,
            orderBy: { createdAt: "desc" }
        });

        if ( allTasks.length > 0 ) return allTasks;
        else throw new HttpException( "Sem registros. ", HttpStatus.NOT_FOUND )
    }
    
    async findOneTask( id: number ){
        const newId = Number(id)
        
        const task = await this.prisma.task.findFirst({
            where: { id: newId }
        })
        if ( task?.name ) return task;

        throw new HttpException("Sem registros. ", HttpStatus.NOT_FOUND)
    }

    async create(createTaskDto: CreateTaskDTO){
       const newTask = await this.prisma.task.create({
        data: {
            name: createTaskDto.name,
            description: createTaskDto.description,
            completed: false,
        }
       })
       
       return newTask;
    }

    async updatedTask(id : number, updateTask: UpdateTaskDTO){
        const findTask = await this.prisma.task.findFirst({
            where: { 
                id: id 
            }
        })

        if(!findTask){
            throw new HttpException("Essa tarefa não existe: ", HttpStatus.NOT_FOUND)
        }

        const task = await this.prisma.task.update({
            where: { 
                id: findTask.id 
            },
            data: updateTask
        })

        return task
    }

    async deleteTask(id){
        const findTask = await this.prisma.task.findFirst({
            where: { id: id }
        })

        if(!findTask) {
            throw new HttpException("Essa tarefa não existe! ", HttpStatus.NOT_FOUND)
        }
        await this.prisma.task.delete({
            where: { id: id }
        })
        
        return { message: "Tarefa removida" }
    }
}
