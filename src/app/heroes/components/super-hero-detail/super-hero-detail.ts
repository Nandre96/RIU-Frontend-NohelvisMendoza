import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Buttons } from '../../../shared/components/buttons/buttons';
import { ChipList } from '../../../shared/components/chip-list/chip-list';
import { ColoredLabelValue } from '../../../shared/components/colored-label-value/colored-label-value';
import { PublisherInfo } from '../../../shared/components/publisher-info/publisher-info';
import { SuperHeroViewService } from '../../services/super-hero-view';
@Component({
  selector: 'app-super-hero-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinner,
    MatTooltip,
    MatChipsModule,
    ChipList,
    PublisherInfo,
    ColoredLabelValue,
    MatButtonModule,
    Buttons,
  ],
  templateUrl: './super-hero-detail.html',
  styleUrl: './super-hero-detail.css',
})
export class SuperHeroDetail {
  private readonly route = inject(ActivatedRoute);
  readonly superHeroesViewService = inject(SuperHeroViewService);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      this.superHeroesViewService.selectAndCheckHero(Number(id));
    });
  }
}
