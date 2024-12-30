const API_URL = "https://task-manager-backend-production-23f2.up.railway.app/api";

export const AuthService = {
  async register(email: string, password: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Error al registrar: ${response.statusText}`);
    }
  },

  async login(email: string, password: string): Promise<string> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Error al iniciar sesión: ${response.statusText}`);
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token); 
    return data.token;
  },

  logout(): void {
    localStorage.removeItem("authToken");
  },

  getToken(): string | null {
    return localStorage.getItem("authToken"); 
  },
};
