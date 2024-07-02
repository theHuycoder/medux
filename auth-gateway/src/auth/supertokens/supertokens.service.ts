import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Emailpassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import EmailVerification from 'supertokens-node/recipe/emailverification';

import {
  AuthModuleConfig,
  SUPERTOKENS_CONFIG_TOKEN,
} from '../config.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { take } from 'rxjs';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(SUPERTOKENS_CONFIG_TOKEN) private readonly config: AuthModuleConfig,
    @Inject('USER_GRPC_SERVICE') private readonly client: ClientGrpc,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Emailpassword.init({
          override: {
            functions: (originalImplementation) => ({
              ...originalImplementation,
              signUp: async (input) => {
                const response = await originalImplementation.signUp(input);
                const userService = this.client.getService(
                  'UserService',
                ) as any;

                // Create user in user service

                console.log(this.client);

                if (response.status === 'OK') {
                  const resp = await userService.PostUser({
                    user_id: response.user.id,
                    firstName: 'Huy',
                    lastName: 'Do',
                    gender: 'Male',
                  });

                  resp.pipe(take(1)).subscribe({
                    next: (data) => {
                      console.log(data);
                    },
                    error: (error) => {
                      console.log(error);
                    },
                    complete: () => {
                      console.log('Complete');
                    },
                  });
                }

                return response;
              },
            }),
          },
        }),
        Session.init(),
        Dashboard.init(),
        UserRoles.init(),
        UserMetadata.init(),
        EmailVerification.init({
          mode: 'OPTIONAL',
        }),
      ],
    });
  }
}
