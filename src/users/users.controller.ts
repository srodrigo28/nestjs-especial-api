import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  findAll(){
    return this.userService.findAll()
  }

  @Get('pagination')
  findAll2(@Query() PaginationDto: PaginationDto){
    return this.userService.findAllPagination(PaginationDto)
  }

  @Get(":id")
  findOneUser(@Param('id', ParseIntPipe) id: number){
    return this.userService.findOne(id)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto)
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
    return this.userService.update(id, updateUserDto)
  }
}