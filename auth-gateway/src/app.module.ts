import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    AuthModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        appInfo: {
          appName: configService.get<string>('APP_NAME'),
          apiDomain: configService.get<string>('API_DOMAIN'),
          websiteDomain: configService.get<string>('WEB_DOMAIN'),
          apiBasePath: configService.get<string>('API_BASE_PATH'),
        },
        connectionURI: configService.get<string>('SUPERTOKENS_CONNECTION_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
