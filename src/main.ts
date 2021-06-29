import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Input validation pipe
  app.useGlobalPipes(new ValidateInputPipe({ transform: true }));

  // Start the server
  await app.listen(3000);
}
bootstrap();
