import { Component, OnInit, computed, signal } from '@angular/core';
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

  // NEW filtering + sorting signals
  searchTerm = signal('');
  sortOption = signal('name-asc');

  // Computed filtered + sorted list
  filteredStarships = computed(() => {
    let list = [...this.starships];

    // Filter by search string
    const term = this.searchTerm().toLowerCase();
    if (term) {
      list = list.filter(s =>
        (s.name?.toLowerCase().includes(term)) ||
        (s.model?.toLowerCase().includes(term)) ||
        (s.starship_class?.toLowerCase().includes(term)) ||
        (s.manufacturer?.toLowerCase().includes(term))
      );
    }

    // Sort options
    switch (this.sortOption()) {
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'crew-asc':
        list.sort((a, b) => (Number(a.crew) || 0) - (Number(b.crew) || 0));
        break;
      case 'crew-desc':
        list.sort((a, b) => (Number(b.crew) || 0) - (Number(a.crew) || 0));
        break;
      case 'hyperdrive-asc':
        list.sort((a, b) => (Number(a.hyperdrive_rating) || 0) - (Number(b.hyperdrive_rating) || 0));
        break;
      case 'hyperdrive-desc':
        list.sort((a, b) => (Number(b.hyperdrive_rating) || 0) - (Number(a.hyperdrive_rating) || 0));
        break;
    }

    return list;
  });

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
      error: () => this.loading = false
    });
  }

  addFavorite(id: number) {
    this.favorites.addFavorite(id).subscribe({
      next: () => alert('Added to favorites!'),
      error: () => alert('Failed to add favorite.')
    });
  }
}
