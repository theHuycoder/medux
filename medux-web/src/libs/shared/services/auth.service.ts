import { Injectable } from '@angular/core';
import SuperTokens from 'supertokens-web-js';
import { environment } from '@environments/environment';
import Session from 'supertokens-web-js/recipe/session';
import ThirdParty from 'supertokens-web-js/recipe/thirdparty';
import EmailPassword, { signIn, signUp } from 'supertokens-web-js/recipe/emailpassword';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    SuperTokens.init({
      appInfo: {
        apiDomain: environment.supertokens.apiDomain,
        apiBasePath: environment.supertokens.apiBasePath,
        appName: environment.supertokens.appName,
      },
      recipeList: [Session.init(), EmailPassword.init(), ThirdParty.init()],
    });
  }
  signUp(email: string, password: string) {
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

    return from(signUp(payload));
  }

  signIn(email: string, password: string) {
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

  checkSession() {
    return from(Session.doesSessionExist());
  }
}
