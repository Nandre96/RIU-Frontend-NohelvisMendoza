import { Component, inject, input } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { SuperHeroView } from '../../models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from '../../services/super-hero-view';
@Component({
  selector: 'app-super-heroe-item',
  imports: [MatCardModule, MatTooltipModule, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './super-heroe-item.html',
  styleUrl: './super-heroe-item.css',
})
export class SuperHeroeItem {
  superHeroe = input.required<SuperHeroView>();
  readonly superHeroesViewService = inject(SuperHeroViewService);
  private readonly router = inject(Router);

  onEdit(hero: SuperHeroView): void {
    this.superHeroesViewService.selectHero(hero.id);
    this.router.navigate(['/heroes', hero.id, 'edit']);
  }

  onDelete(hero: SuperHeroView): void {
    this.superHeroesViewService.deleteHero(hero.id);
  }
}
