import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Starship } from '../models/starship';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StarshipService {
  private api = 'https://localhost:7233/api/Starship';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Starship[]> {
    return this.http.get<Starship[]>(this.api);
  }

  getById(id: number): Observable<Starship> {
    return this.http.get<Starship>(`${this.api}/${id}`);
  }

  create(starship: Partial<Starship>): Observable<Starship> {
    return this.http.post<Starship>(this.api, starship);
  }

  update(id: number, starship: Partial<Starship>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, starship);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
