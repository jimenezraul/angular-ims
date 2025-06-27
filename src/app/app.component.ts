import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <div class="bg-gray-200 min-h-screen">
      <app-nav></app-nav>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
