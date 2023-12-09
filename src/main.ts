import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Server')
    .setDescription('Backend API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const conf: ConfigService = app.get(ConfigService);
  const port: number = conf.get<number>('PORT');
  await app.listen(port, () => {
    console.log('Server: ', `http://localhost:${port}`);
  });
};

bootstrap();
