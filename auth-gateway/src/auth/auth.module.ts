import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { AuthModuleConfig, SUPERTOKENS_CONFIG_TOKEN } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';
import { AuthMiddleware } from './auth.middleware';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getGrpcUserClientOptions } from '@/grpc-client.options';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_GRPC_SERVICE',
        useFactory: (configService: ConfigService) =>
          getGrpcUserClientOptions(
            '0.0.0.0:4400' ||
              configService.get<string>('USER_SERVICE_CONNECTION_URI'),
          ),
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot(config: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          provide: SUPERTOKENS_CONFIG_TOKEN,
          useValue: config,
        },
        SupertokensService,
      ],
      module: AuthModule,
    };
  }

  static forRootAsync(options: {
    imports: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<AuthModuleConfig> | AuthModuleConfig;
    inject?: any[];
  }): DynamicModule {
    const providers: Provider[] = [
      {
        provide: SUPERTOKENS_CONFIG_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject,
      },
      SupertokensService,
    ];

    return {
      module: AuthModule,
      imports: options.imports,
      providers,
    };
  }
}
