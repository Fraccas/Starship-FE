import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../constants/api';

export interface DecodedToken {
  email: string;
  exp: number;
  role?: string | string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${API_BASE_URL}/auth`;

  // Hold raw JWT
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  // ------------------------------------------------------------
  // AUTH REQUESTS
  // ------------------------------------------------------------
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.api}/login`, { email, password });
  }

  register(email: string, password: string) {
    return this.http.post(`${this.api}/register`, { email, password });
  }

  saveToken(token: string) {
    this.token.set(token);
    localStorage.setItem('token', token);
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('token');
  }

  // ------------------------------------------------------------
  // DECODE & VALIDATE TOKEN
  // ------------------------------------------------------------
  private decodeToken(): DecodedToken | null {
    const raw = this.token();
    if (!raw) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(raw);

      // Validate expiration
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        return null;
      }

      return decoded;
    } catch {
      // Invalid / malformed token
      this.logout();
      return null;
    }
  }

  // ------------------------------------------------------------
  // PUBLIC HELPERS
  // ------------------------------------------------------------
  isLoggedIn(): boolean {
    return this.decodeToken() !== null;
  }

  getUserEmail(): string {
    return this.decodeToken()?.email ?? '';
  }

  isAdmin(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return false;

    const roleValue = decoded.role;

    if (Array.isArray(roleValue)) {
      return roleValue.includes("Admin");
    }

    return roleValue === "Admin";
  }
}
