import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule,
    MatDivider,
  ],
  templateUrl: './super-hero-list.html',
  styleUrls: ['./super-hero-list.css'],
})
export class SuperHeroList {
  readonly superHeroesViewService = inject(SuperHeroViewService);

  searchControl = new FormControl('');
  searchValue = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  pageSizeOptions = [5, 10, 20];
  readonly pageSize = signal(10);
  readonly pageIndex = signal(0);
  readonly pagedSuperHeroes = computed(() => {
    const allHeroes = this.superHeroesViewService.superHeroes();
    console.log({ allHeroes });
    const itemsPerPage: number = this.pageSize();
    const currentPageIndex: number = this.pageIndex();

    const startIndex: number = currentPageIndex * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;

    return allHeroes.slice(startIndex, endIndex);
  });

  readonly totalHeroes = computed(() => this.superHeroesViewService.superHeroes().length);

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  constructor() {
    effect(() => {
      const value = this.searchValue() ?? '';
      this.superHeroesViewService.setSearch(value);
      this.pageIndex.set(0);
    });
  }
}
