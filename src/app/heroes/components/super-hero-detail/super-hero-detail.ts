import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Buttons } from '../../../shared/components/buttons/buttons';
import { ChipList } from '../../../shared/components/chip-list/chip-list';
import { ColoredLabelValue } from '../../../shared/components/colored-label-value/colored-label-value';
import { PublisherInfo } from '../../../shared/components/publisher-info/publisher-info';
import { SuperHeroViewService } from '../../services/super-hero-view';
@Component({
  selector: 'app-super-hero-detail',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltip,
    MatChipsModule,
    ChipList,
    PublisherInfo,
    ColoredLabelValue,
    MatButtonModule,
    Buttons,
    RouterLink,
  ],
  templateUrl: './super-hero-detail.html',
  styleUrl: './super-hero-detail.css',
})
export class SuperHeroDetail {
  private readonly route = inject(ActivatedRoute);
  readonly superHeroesViewService = inject(SuperHeroViewService);
  readonly param = toSignal<ParamMap | undefined>(this.route.paramMap);

  constructor() {
    effect(() => {
      const id = this.param()?.get('id');
      this.superHeroesViewService.selectAndCheckHero(Number(id));
    });
  }
}
