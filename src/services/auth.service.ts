import api from "./api";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth.types";

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/api-token-auth/",
      credentials
    );
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await api.post("/api/auth/register/", credentials);
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>("/api/auth/user/");
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },
};
