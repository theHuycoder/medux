import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SupertokensModule } from '@libs/shared/ds-core-ang';
import { environment } from '@environments/environment';
import { SuperTokensConfig } from 'supertokens-web-js/types';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import ThirdParty from 'supertokens-web-js/recipe/thirdparty';

const supertokensConfig: SuperTokensConfig = {
  appInfo: {
    apiDomain: environment.supertokens.apiDomain,
    apiBasePath: environment.supertokens.apiBasePath,
    appName: environment.supertokens.appName,
  },
  recipeList: [Session.init(), EmailPassword.init(), ThirdParty.init()],
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SupertokensModule.forRoot(supertokensConfig)),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
