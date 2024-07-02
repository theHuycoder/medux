import { inject, Injectable, InjectionToken } from '@angular/core';
import { SuperTokensConfig } from 'supertokens-web-js/types';
import SuperTokens from 'supertokens-web-js';
import { from, take } from 'rxjs';
import { signIn, signUp } from 'supertokens-web-js/recipe/emailpassword';
import Session from 'supertokens-web-js/recipe/session';

export const SUPERTOKENS_CONFIG_TOKEN = new InjectionToken<SuperTokensConfig>('SUPERTOKENS_CONFIG_TOKEN');

@Injectable()
export class SupertokensService {
  private _config = inject(SUPERTOKENS_CONFIG_TOKEN);

  constructor() {
    SuperTokens.init(this._config);
  }

  postEmailPasswordSignUp(email: string, password: string) {
    const payload = {
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    };

    return from(signUp(payload)).pipe(take(1));
  }

  postEmailPasswordSignIn(email: string, password: string) {
    const payload = {
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    };

    return from(signIn(payload));
  }

  doesSessionExist() {
    return from(Session.doesSessionExist());
  }

  getSessionInfo() {
    return from(Session.doesSessionExist());
  }
}
