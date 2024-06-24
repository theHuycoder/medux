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

@Module({
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
