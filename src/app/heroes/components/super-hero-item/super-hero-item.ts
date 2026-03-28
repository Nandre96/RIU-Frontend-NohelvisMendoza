import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Buttons } from '../../../shared/components/buttons/buttons';
import { NotificationEventBus } from '../../../shared/services/notification-event-bus';
import { SuperHeroView } from '../../models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from '../../services/super-hero-view';
@Component({
  selector: 'app-super-hero-item',
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
    Buttons,
  ],
  templateUrl: './super-hero-item.html',
  styleUrl: './super-hero-item.css',
})
export class SuperHeroItem {
  superHero = input.required<SuperHeroView>();
  readonly superHeroesViewService = inject(SuperHeroViewService);
  private notificationBus = inject(NotificationEventBus);

  showHeroGreeting() {
    const hero = this.superHero();
    this.notificationBus.notify({
      message: `¡Hola, soy ${hero.name}!`,
      duration: 300,
    });
  }
}
