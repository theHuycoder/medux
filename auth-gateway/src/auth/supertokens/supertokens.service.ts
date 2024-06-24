import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(SUPERTOKENS_CONFIG_TOKEN) private config: AuthModuleConfig,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Emailpassword.init(),
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
