import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { SuperHeroAdapterService } from '../adapters/super-hero.adapter';
import { SuperHeroResponse } from '../models/interfaces/response/super-hero.response.interface';
import { SuperHeroFormValue } from '../models/interfaces/super-heroe-form.interface';
import { SuperHeroView } from '../models/interfaces/view/super-hero.view.interface';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../models/types/request/update-super-heroe.request.type';
import { SuperHeroService } from './super-hero';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroViewService {
  private readonly superHeroService = inject(SuperHeroService);
  private readonly superHeroAdapter = inject(SuperHeroAdapterService);
  private readonly snackBar = inject(MatSnackBar);
  readonly searchHeroName = signal('');
  readonly selectedSuperHeroId = signal<number | null>(null);

  readonly allSuperHeroes = computed<SuperHeroView[]>(() => {
    const data = this.allSuperHeroesResource.value();
    if (!data) return [];
    return data.map((hero) => this.superHeroAdapter.toSuperHeroView(hero));
  });

  readonly superHeroes = computed<SuperHeroView[]>(() => {
    const data = this.superHeroFetchResource.value();
    if (!data) {
      return [];
    }
    return data.map((hero) => this.superHeroAdapter.toSuperHeroView(hero));
  });

  readonly selectedSuperHero = computed<SuperHeroView | null>(() => {
    const selectedSuperHeroId: number | null = this.selectedSuperHeroId();
    if (selectedSuperHeroId == null) {
      return null;
    }

    const current = this.superHeroes().find((superHero) => superHero.id === selectedSuperHeroId);
    return current ?? null;
  });

  readonly selectedSuperToFormValue = linkedSignal(() => {
    const selected = this.selectedSuperHero();
    if (!selected) return null;
    return this.superHeroAdapter.viewToSuperHeroFormValue(selected);
  });

  private readonly superHeroFetchResource = rxResource<SuperHeroResponse[], { search: string }>({
    params: () => ({ search: this.searchHeroName() }),
    stream: ({ params }) => this.superHeroService.getByName(params.search),
  });

  readonly allSuperHeroesResource = rxResource<SuperHeroResponse[], void>({
    stream: () => this.superHeroService.getAll(),
  });

  setSearch(term: string): void {
    this.searchHeroName.set(term);
  }

  selectHero(id: number | null): void {
    this.selectedSuperHeroId.set(id);
  }

  createPayload(
    formValue: SuperHeroFormValue,
    isEdit: boolean,
  ): CreateSuperHeroRequest | UpdateSuperHeroRequest {
    return this.superHeroAdapter.formValueToPayload(
      formValue,
      isEdit,
      this.selectedSuperHeroId() ?? undefined,
    );
  }

  createHero(payload: CreateSuperHeroRequest): void {
    this.superHeroService
      .create(payload)
      .pipe(
        map((created) => this.superHeroAdapter.toSuperHeroView(created)),
        tap(() => {
          this.superHeroFetchResource.reload();
          this.showMessage('Super héroe creado correctamente');
        }),
        catchError((error) => {
          console.error('Error al crear ', error);
          this.showMessage('Error al crear el super héroe');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  updateHero(payload: UpdateSuperHeroRequest): void {
    this.superHeroService
      .update(payload)
      .pipe(
        map((updated) => this.superHeroAdapter.toSuperHeroView(updated)),
        tap(() => {
          this.showMessage('Super héroe actualizado correctamente');
          this.superHeroFetchResource.reload();
        }),
        catchError((error) => {
          console.error('Error al actualizar', error);
          this.showMessage('Error al actualizar el super héroe');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  deleteHero(id: number): void {
    this.superHeroService
      .delete(id)
      .pipe(
        tap(() => {
          this.showMessage('Super héroe eliminado correctamente');
          this.superHeroFetchResource.reload();
        }),
        catchError((error) => {
          console.error('Error al eliminar', error);
          this.showMessage('Error al eliminar el super héroe');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
