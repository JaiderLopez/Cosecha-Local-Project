import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthGuardService } from "../services/authguard.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthGuardService);
    return authService.getAuthToken();
}