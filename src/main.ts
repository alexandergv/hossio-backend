import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'http://localhost:4321', // Your frontend origin
    credentials: true, // Allow cookies to be sent and received
  });
  await app.listen(3000);
}
bootstrap();
