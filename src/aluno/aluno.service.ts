import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { AlunoEntity } from './entities/aluno.entity';

@Injectable()
export class AlunoService {
  
  private alunos: AlunoEntity[] = [
    { id: 1, nome: "Emerson",   estado: "Amazonas", cidade: 'não sei', preco: 100 },
    { id: 2, nome: "Carlos",    estado: "Ceara",    cidade: 'não sei', preco: 100 },
    { id: 3, nome: "Felipe",    estado: "Rio Janeiro", cidade: 'não sei', preco: 100 },
    { id: 4, nome: "Giovanni",  estado: "Rondônia", cidade: 'porto velho', preco: 100 },
    { id: 5, nome: "Giovanni",  estado: "Eduarda",  cidade: 'aparecida', preco: 100 },
]

  create(createAlunoDto: CreateAlunoDto) {
    return 'This action adds a new aluno';
  }

  findAll() {
    return `This action returns all aluno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aluno`;
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }

  /**
   * Especiais
   */

}
