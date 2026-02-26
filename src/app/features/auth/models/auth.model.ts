import { User } from "../../../core/types";

export interface LoginResponse {
  data: {
    access_token: string;
    user: User;
  };
}
