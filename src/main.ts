import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
  })

  const configSwagger = new DocumentBuilder()
  .setTitle('Lista de Apps')
  .setDescription('API lista de tarefas')
  .setVersion('1.0')
  .build()

  const documentFactory = () => SwaggerModule.createDocument(
    app, configSwagger
  )

  SwaggerModule.setup('docs', app, documentFactory)

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();