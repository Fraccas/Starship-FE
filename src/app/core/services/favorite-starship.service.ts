import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteStarship } from '../models/favorite-starship';
import { API_BASE_URL } from '../constants/api';

@Injectable({ providedIn: 'root' })
export class FavoriteStarshipService {

  private api = `${API_BASE_URL}/favoritestarship`;

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
