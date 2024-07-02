import { ClientOptions } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export const getGrpcUserClientOptions = (url: string): ClientOptions => ({
  transport: Transport.GRPC,
  options: {
    url,
    package: 'user',
    protoPath: join(__dirname, './user/user.proto'),
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
});
