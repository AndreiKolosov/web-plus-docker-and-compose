import { ValidationFailedException } from './exceptions/validation-failed-exception';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cors from 'cors';

async function bootstrap() {
  const PORT = process.env.SERVER_PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new ValidationFailedException(),
    }),
  );

  app.use(
    cors({
      origin: [
        'https://kolosov.kypipodariday.nomoredomains.work',
        'http://kolosov.kypipodariday.nomoredomains.work',
      ],
      optionsSuccessStatus: 200,
    }),
  );
  app.use(helmet());

  await app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
}
bootstrap();
