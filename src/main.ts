import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.ORIGIN_URL, // Your frontend origin
    credentials: true, // Allow cookies to be sent and received
  });
  await app.listen(port);
}
bootstrap();
