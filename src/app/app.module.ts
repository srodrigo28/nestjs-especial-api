import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { AlunoModule } from 'src/aluno/aluno.module'; 
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [TasksModule, AlunoModule, 
    // config para arquivos esticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files'),
      serveRoot: "/files"
    }),
    // config para arquivos esticos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
