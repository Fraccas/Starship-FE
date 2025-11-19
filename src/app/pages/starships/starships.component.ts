import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { StarshipService } from '../../core/services/starship.service';
import { Starship } from '../../core/models/starship';
import { FavoriteStarshipService } from '../../core/services/favorite-starship.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {

  starships: Starship[] = [];
  loading = true;

  constructor(
    private starshipService: StarshipService,
    private favorites: FavoriteStarshipService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.starshipService.getAll().subscribe({
      next: (res: Starship[]) => {
        this.starships = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  addFavorite(id: number) {
    this.favorites.addFavorite(id).subscribe({
      next: () => alert('Added to favorites!'),
      error: () => alert('Failed to add favorite.')
    });
  }
}
