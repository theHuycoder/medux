import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { SupertokensService } from '../../shared/ds-core-ang';

export const canAccessDashboardGuard: CanActivateFn = () => {
  const supertokens = inject(SupertokensService);
  const router = inject(Router);

  return supertokens.doesSessionExist().pipe(
    map((sessionExist) => {
      if (!sessionExist) {
        router.navigate(['/auth/sign-in']).then();
      }

      return sessionExist;
    }),
  );
};

export const canRedirectToDashboardGuard: CanActivateFn = () => {
  const supertokens = inject(SupertokensService);
  const router = inject(Router);

  return supertokens.doesSessionExist().pipe(
    map((sessionExist) => {
      if (sessionExist) {
        router.navigate(['/dashboard']).then();
      }
      return !sessionExist;
    }),
  );
};
