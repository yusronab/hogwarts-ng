import { inject, Injectable } from "@angular/core";
import { AuthApiService } from "./auth-api.service";

@Injectable({ providedIn: 'root' })
export class AuthBootstrapService {
  private api = inject(AuthApiService);

  refreshProfile() {
    return this.api.getProfile();
  }
}
