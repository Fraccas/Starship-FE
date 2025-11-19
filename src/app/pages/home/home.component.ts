import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
  <div class="page-container">
    <h1 style="display:flex; align-items:center; gap:10px;">
      <span>🚀</span>
      <span style="color:#9fc4ff; text-shadow:0 0 12px rgba(120,180,255,0.9);">
        Starship Explorer
      </span>
    </h1>

    <p style="opacity:0.9">
      Discover, favorite, and study your favorite Starships.
    </p>
  </div>
`
})
export class HomeComponent { }
