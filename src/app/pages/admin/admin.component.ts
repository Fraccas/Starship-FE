import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StarshipService } from '../../core/services/starship.service';
import { Starship } from '../../core/models/starship';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  starships: Starship[] = [];
  loading = true;

  editing: boolean = false;
  isNew: boolean = false;

  formModel: Partial<Starship> = {};

  constructor(private starshipService: StarshipService) {}

  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships() {
    this.loading = true;
    this.starshipService.getAll().subscribe({
      next: data => {
        this.starships = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  startCreate() {
    this.editing = true;
    this.isNew = true;
    this.formModel = {
      name: '',
      model: '',
      manufacturer: '',
      starship_class: '',
      hyperdrive_rating: '',
      max_atmosphering_speed: '',
      crew: '',
      passengers: ''
    };
  }

  startEdit(ship: Starship) {
    this.editing = true;
    this.isNew = false;
    this.formModel = { ...ship };
  }

  cancelEdit() {
    this.editing = false;
    this.isNew = false;
    this.formModel = {};
  }

  save(form?: NgForm) {
    if (form && form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    // CREATE
    if (this.isNew) {
      this.starshipService.create(this.formModel).subscribe({
        next: () => {
          this.cancelEdit();
          this.loadStarships();
        },
        error: err => console.error(err)
      });
      return;
    }

    // UPDATE
    const id = this.formModel.id;
    if (!id) return;

    this.starshipService.update(id, this.formModel).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadStarships();
      },
      error: err => console.error(err)
    });
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this starship?')) return;

    this.starshipService.delete(id).subscribe({
      next: () => {
        this.starships = this.starships.filter(s => s.id !== id);
      },
      error: err => console.error(err)
    });
  }
}
