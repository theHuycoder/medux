import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import supertokens from 'supertokens-node';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getGrpcUserClientOptions } from './grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const webOrigin = configService.get<string>('WEB_DOMAIN');
  const port = +configService.get<number>('PORT');
  const userServiceConnectionUri = configService.get<string>(
    'USER_SERVICE_CONNECTION_URI',
  );

  app.connectMicroservice<MicroserviceOptions>(
    getGrpcUserClientOptions(userServiceConnectionUri),
  );
  await app.startAllMicroservices();

  app.enableCors({
    origin: [webOrigin],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());
  await app.listen(port);
}
bootstrap();
