import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { SuperHeroView } from '../../models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from '../../services/super-hero-view';
@Component({
  selector: 'app-super-hero-list',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatButtonModule,
    MatIconButton,
    RouterLink,
  ],
  templateUrl: './super-hero-list.html',
  styleUrls: ['./super-hero-list.css'],
})
export class SuperHeroList {
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly superHeroesViewService = inject(SuperHeroViewService);
  private readonly router = inject(Router);
  readonly #currentBreakpoint = toSignal(
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web,
      ])
      .pipe(
        map((state: BreakpointState) => {
          const { XSmall, Small, Medium, Tablet } = state.breakpoints;
          if (XSmall) return 'XSmall';
          if (Small) return 'Small';
          if (Medium) return 'Medium';
          if (Tablet) return 'Tablet';
          return 'Other';
        }),
      ),
    { initialValue: 'Other' },
  );

  readonly gridCols = computed(() => {
    const breakPoint = this.#currentBreakpoint();
    if (breakPoint === 'XSmall' || breakPoint === 'Small') return 1;
    if (breakPoint === 'Medium' || breakPoint === 'Tablet') return 2;
    return 3;
  });

  onEdit(hero: SuperHeroView): void {
    this.superHeroesViewService.selectHero(hero.id);
    this.router.navigate(['/heroes', hero.id, 'edit']);
  }

  onDelete(hero: SuperHeroView): void {
    this.superHeroesViewService.deleteHero(hero.id);
  }
}
