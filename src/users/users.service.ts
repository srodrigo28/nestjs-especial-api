import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){ }

  async findAll(){
    const AllUsers = await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" }
    })

    if( AllUsers.length > 0 ) return AllUsers;
    else throw new HttpException("Sem registors",
      HttpStatus.NOT_FOUND
    )
  }

  async findAllPagination(paginationDto: PaginationDto){
    const { limit= 10, offset = 0 } = paginationDto;

    const AllUsersPagination = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc'}
    })
  }

  async findOne(id: number){
    const user = await this.prisma.user.findFirst({
      where: { 
        id: id, 
      },
      select: { id: true, name: true, email: true, Task: true }
    })

    if(user) return user;

    throw new HttpException( 'Usuário não encontrado! ', 
        HttpStatus.BAD_REQUEST )
  }

  async create(createUserDto: CreateUserDto) {
    try{
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash: createUserDto.password
        },
        select: { id: true, name: true, email: true }
      })

      if(user) return user;

      throw new HttpException('Falha ao cadastrar usuário! ', 
          HttpStatus.BAD_REQUEST )

    }catch(err){
      console.log(err);
      throw new HttpException('Falha ao cadastrar usuário! ', 
          HttpStatus.BAD_REQUEST )
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto){
    try{
      const user = await this.prisma.user.findFirst({
        where: { id: id }
      })

      if(!user){
        throw new HttpException('Falha ao atualizar usuário!', HttpStatus.BAD_REQUEST)
      }

      const updateUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { 
          name: updateUserDto.name ? updateUserDto.name : user.name,
          passwordHash: updateUserDto.password ? updateUserDto.password : user.passwordHash,
        },
        select: { id: true, name: true, email: true }
      })

      return updateUser;

    }catch(err){
      console.log(err);
      throw new HttpException('Falha ao atualizar usuário!', HttpStatus.BAD_REQUEST)
    }
  }

  async delete(id: number){
    try{
      const user = await this.prisma.user.findFirst({
        where: { id: id }
      })
      if(!user){
        throw new HttpException('Usuário não existe! ', HttpStatus.BAD_REQUEST)
      }
      await this.prisma.user.delete({
        where:{ id: user.id }
      })
      return{ message: " Usuário foi deletado com sucesso! "}
    }catch(err){
      console.log(err)
      throw new HttpException('Falha ao deletar usuário!', HttpStatus.BAD_REQUEST)
    }
  }
}