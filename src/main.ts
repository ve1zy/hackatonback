import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API for projects, tasks, chat, calls')
    .setVersion('1.0')
    .addTag('projects', 'Project management')
    .addTag('tasks', 'Task management')
    .addTag('users', 'User management')
    .addTag('calls', 'Video calls')
    .addTag('chat', 'Chat messages')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
