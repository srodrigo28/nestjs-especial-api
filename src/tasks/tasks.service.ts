import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        { id: 1, name: "Comprar 1", completed: false, description: 'html' },
        { id: 2, name: "Comprar 2", completed: false, description: 'css' },
        { id: 3, name: "Comprar 3", completed: false, description: 'js' },
    ]
    
    filterCompleted = this.tasks.find(task => task.completed === true )
    
    findAll(){
        return {  
            total: this.tasks.length,

            data: this.tasks
        }
    }

    findOneTask(id: string){
        const task = this.tasks.find( task => task.id === Number(id))

        if(task) return task;

        throw new HttpException("Essa tarefa não existe. ", HttpStatus.NOT_FOUND)
    }

    create(taskBody: CreateTaskDTO){

        const taskIndex = this.tasks.find(task => task.name === taskBody.name )

        if( taskIndex ){
            return { message: "Tarefa já existe"}
        }
        const newId = this.tasks.length + 1

        const newTask = {
            id: newId,
            ...taskBody,
            completed: false,
        }

        this.tasks.push(newTask)

        return  newTask 
    }

    updated(id: string, updateTask: UpdateTaskDTO){
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))
        
        if(taskIndex < 0){
            throw new HttpException("Essa tarefa não existe. ", HttpStatus.NOT_FOUND)
        }
        
        const taskIndexExist = this.tasks.find(task => task.name === updateTask.name )

        if( taskIndexExist ){
            return "Já existe: " + updateTask.name
        }
        
        const taskItem = this.tasks[taskIndex]
        
        this.tasks[taskIndex] = {
            ...taskItem,
            ...updateTask,
        }
        return updateTask
    }

    delete(id: string){
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))
       
        if(taskIndex < 0 || undefined){
            throw new HttpException("Essa tarefa não existe. ", HttpStatus.NOT_FOUND)     
        }

        this.tasks.splice(taskIndex, 1)
        return { message: "Tarefa removida" }
    }
}
