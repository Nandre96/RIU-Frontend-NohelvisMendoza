import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';
import { SuperHeroViewService } from '../../services/super-hero-view';
import { SuperHeroeItem } from '../super-heroe-item/super-heroe-item';
@Component({
  selector: 'app-super-hero-list',
  imports: [
    MatGridListModule,
    MatButtonModule,
    SuperHeroeItem,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  templateUrl: './super-hero-list.html',
  styleUrls: ['./super-hero-list.css'],
})
export class SuperHeroList {
  readonly superHeroesViewService = inject(SuperHeroViewService);
  pageSizeOptions = [5, 10, 20];

  readonly pageSize = signal(10);
  readonly pageIndex = signal(0);

  readonly pagedSuperHeroes = computed(() => {
    const allHeroes = this.superHeroesViewService.superHeroes();
    const itemsPerPage = this.pageSize();
    const currentPageIndex = this.pageIndex();

    const startIndex = currentPageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return allHeroes.slice(startIndex, endIndex);
  });

  readonly totalHeroes = computed(() => this.superHeroesViewService.superHeroes().length);

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
