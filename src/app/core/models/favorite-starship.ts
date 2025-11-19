import { Starship } from './starship';

export interface FavoriteStarship {
  id: number;
  userId: string;
  starshipId: number;
  nickname?: string;
  notes?: string;
  createdAt: string;
  starship: Starship;  // Fully expanded object
}
