import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteStarshipService } from '../../core/services/favorite-starship.service';
import { FavoriteStarship } from '../../core/models/favorite-starship';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {

  favorites: FavoriteStarship[] = [];
  loading = true;

  constructor(private favService: FavoriteStarshipService) {}

  ngOnInit(): void {
    this.favService.getFavorites().subscribe({
      next: (data: FavoriteStarship[]) => {
        this.favorites = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  removeFavorite(id: number) {
    if (!confirm('Remove this favorite?')) return;

    this.favService.removeFavorite(id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.id !== id);
      },
      error: (err: any) => console.error(err)
    });
  }
}
