import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Buttons } from '../../../shared/components/buttons/buttons';
import { SuperHeroView } from '../../models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from '../../services/super-hero-view';
@Component({
  selector: 'app-super-heroe-item',
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
    Buttons,
  ],
  templateUrl: './super-heroe-item.html',
  styleUrl: './super-heroe-item.css',
})
export class SuperHeroeItem {
  superHeroe = input.required<SuperHeroView>();
  readonly superHeroesViewService = inject(SuperHeroViewService);
}
