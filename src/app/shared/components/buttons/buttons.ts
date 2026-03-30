import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SuperHeroView } from '../../../heroes/models/interfaces/view/super-hero.view.interface';
import { SuperHeroActionService } from '../../../heroes/services/super-hero-action';
import { NotificationEventBus } from '../../services/notification-event-bus';

@Component({
  selector: 'app-buttons',
  imports: [MatButtonModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class Buttons {
  superHero = input.required<SuperHeroView>();
  private superHeroAction = inject(SuperHeroActionService);
  private readonly router = inject(Router);
  private readonly notificationBus = inject(NotificationEventBus);

  onEdit() {
    this.superHeroAction.onAction({ type: 'EDIT_MODE', payload: this.superHero() }).subscribe({
      next: (superHeroView: SuperHeroView | boolean) => {
        if (typeof superHeroView === 'object') {
          this.router.navigate(['/heroes', superHeroView.id, 'edit']);
        }
      },
      error: (err) => {
        this.notificationBus.notify({
          message: err.message || 'Error al manejar la acción de edición',
        });
      },
    });
  }

  onDelete() {
    this.superHeroAction.onAction({ type: 'DELETE', payload: this.superHero() }).subscribe({
      error: (err) => {
        this.notificationBus.notify({ message: err.message || 'Error al eliminar el super héroe' });
      },
    });
  }
}
