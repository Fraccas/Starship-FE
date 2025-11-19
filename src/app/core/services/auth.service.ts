import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/user';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  email: string;
  role: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://localhost:7233/api/auth';
  
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

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

  isLoggedIn() {
    return this.token() !== null;
  }

  /** ------------------------------------------------------------------
   * Decode token helpers
   * ------------------------------------------------------------------*/
  private decodeToken(): DecodedToken | null {
    const t = this.token();
    if (!t) return null;

    try {
      return jwtDecode<DecodedToken>(t);
    } catch {
      return null;
    }
  }

  getUserEmail(): string {
    return this.decodeToken()?.email ?? '';
  }

  isAdmin(): boolean {
    return this.decodeToken()?.role === 'Admin';
  }
}
