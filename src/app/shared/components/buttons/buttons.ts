import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SuperHeroView } from '../../../heroes/models/interfaces/view/super-hero.view.interface';
import { SuperHeroEventBus } from '../../../heroes/services/super-hero-event-bus';

@Component({
  selector: 'app-buttons',
  imports: [MatButtonModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class Buttons {
  superHeroe = input.required<SuperHeroView>();
  private eventBus = inject(SuperHeroEventBus);
  onEdit() {
    console.log({ onEdit: this.superHeroe() });
    this.eventBus.onAction('EDIT', this.superHeroe());
  }

  onDelete() {
    this.eventBus.onAction('DELETE', this.superHeroe());
  }
}
