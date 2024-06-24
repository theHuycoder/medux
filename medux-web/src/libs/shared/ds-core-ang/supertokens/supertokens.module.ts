import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SuperTokensConfig } from 'supertokens-web-js/types';
import { SUPERTOKENS_CONFIG_TOKEN, SupertokensService } from '@libs/shared/ds-core-ang/supertokens/supertokens.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  exports: [],
})
export class SupertokensModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: SupertokensModule,
  ) {
    if (parentModule) {
      throw new Error(
        'SupertokensModule has already been loaded. You should only import Core modules in the AppModule only.',
      );
    }
  }

  static forRoot(config: SuperTokensConfig) {
    return {
      ngModule: SupertokensModule,
      providers: [
        {
          provide: SUPERTOKENS_CONFIG_TOKEN,
          useValue: config,
        },
        {
          provide: SupertokensService,
          useClass: SupertokensService,
          deps: [SUPERTOKENS_CONFIG_TOKEN],
        },
      ],
    };
  }
}
