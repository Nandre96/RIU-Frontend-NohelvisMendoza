import { Component, computed, inject, input } from '@angular/core';
import { SuperHeroView } from '../../../heroes/models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from '../../../heroes/services/super-hero-view';

@Component({
  selector: 'app-colored-label-value',
  imports: [],
  templateUrl: './colored-label-value.html',
  styleUrl: './colored-label-value.css',
})
export class ColoredLabelValue {
  private readonly superHeroViewService = inject(SuperHeroViewService);
  label = input<string>('');
  value = input<string>('');

  primaryColor = computed(() => {
    const selected: SuperHeroView | null = this.superHeroViewService.superHeroDetail();
    if (!selected) return 'black';
    return selected.profile.primaryColor.toLocaleLowerCase() || 'black';
  });
}
