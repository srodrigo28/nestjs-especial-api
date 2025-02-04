import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { AlunoModule } from 'src/aluno/aluno.module'; 
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Module({
  imports: [TasksModule, AlunoModule, UsersModule,
    // config para arquivos esticos imagens e html etc.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files'),
      serveRoot: "/files"
    }),
    // config para arquivos esticos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
