import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteStarship } from '../models/favorite-starship';

@Injectable({ providedIn: 'root' })
export class FavoriteStarshipService {

  private api = 'https://localhost:7233/api/favorites';

  constructor(private http: HttpClient) {}

  getFavorites() {
    return this.http.get<FavoriteStarship[]>(this.api);
  }

  addFavorite(starshipId: number) {
    return this.http.post(this.api, { starshipId });
  }

  updateFavorite(id: number, nickname: string, notes: string) {
    return this.http.put(`${this.api}/${id}`, { nickname, notes });
  }

  removeFavorite(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
