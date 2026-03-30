import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { NotificationEventBus } from '../../shared/services/notification-event-bus';
import { SuperHeroAdapterService } from '../adapters/super-hero.adapter';
import { SuperHeroResponse } from '../models/interfaces/response/super-hero.response.interface';
import { SuperHeroFormValue } from '../models/interfaces/super-hero-form.interface';
import { SuperHeroView } from '../models/interfaces/view/super-hero.view.interface';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-hero.request.type';
import { UpdateSuperHeroRequest } from '../models/types/request/update-super-hero.request.type';
import { SuperHeroService } from './super-hero';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroViewService {
  private readonly superHeroService = inject(SuperHeroService);
  private readonly superHeroAdapter = inject(SuperHeroAdapterService);

  private readonly notificationBus = inject(NotificationEventBus);
  readonly searchHeroName = signal('');
  readonly selectedSuperHeroIdToEdit = signal<number | null>(null);
  readonly selectedHeroIdToCheck = signal<number | null>(null);

  readonly superHeroes = computed<SuperHeroView[]>(() => {
    const data = this.superHeroFetchResource.value();
    if (!data) return [];
    return data.map((hero) => this.superHeroAdapter.toSuperHeroView(hero));
  });

  readonly superHeroDetail = linkedSignal(() => {
    const hero = this.superHeroDetailResource.value();
    if (!hero) return null;
    return this.superHeroAdapter.toSuperHeroView(hero);
  });

  readonly selectedSuperHero = computed<SuperHeroView | null>(() => {
    const selectedSuperHeroIdToEdit: number | null = this.selectedSuperHeroIdToEdit();
    if (selectedSuperHeroIdToEdit == null) {
      return null;
    }

    const current = this.superHeroes().find(
      (superHero) => superHero.id === selectedSuperHeroIdToEdit,
    );

    return current ?? null;
  });

  readonly selectedSuperToFormValue = linkedSignal<SuperHeroFormValue | null>(() => {
    const selected = this.selectedSuperHero();
    if (!selected) return null;
    return this.superHeroAdapter.viewToSuperHeroFormValue(selected);
  });

  readonly superHeroFetchResource = rxResource<SuperHeroResponse[], { search: string }>({
    params: () => ({ search: this.searchHeroName() }),
    stream: ({ params }) => this.superHeroService.getByName(params.search),
  });

  readonly superHeroDetailResource = rxResource<SuperHeroResponse | undefined, number>({
    params: () => this.selectedHeroIdToCheck() ?? 0,
    stream: ({ params }) => (params > 0 ? this.superHeroService.getById(params) : of(undefined)),
  });

  setSearch(term: string): void {
    this.searchHeroName.set(term);
  }

  selectHero(id: number | null): void {
    this.selectedSuperHeroIdToEdit.set(id);
  }

  selectAndCheckHero(id: number | null): void {
    this.selectedHeroIdToCheck.set(id);
  }

  createPayload(
    formValue: SuperHeroFormValue,
    isEdit: boolean,
  ): CreateSuperHeroRequest | UpdateSuperHeroRequest {
    return this.superHeroAdapter.formValueToPayload(
      formValue,
      isEdit,
      this.selectedSuperHeroIdToEdit() ?? undefined,
    );
  }

  createHero(payload: CreateSuperHeroRequest): Observable<SuperHeroView> {
    return this.superHeroService.create(payload).pipe(
      take(1),
      map((created: SuperHeroResponse) => this.superHeroAdapter.toSuperHeroView(created)),
      switchMap((hero: SuperHeroView) => {
        this.superHeroFetchResource.reload();
        return of(hero);
      }),
      tap(() => this.notificationBus.notify({ message: 'Super héroe creado correctamente' })),
      catchError(() => {
        return throwError(() => new Error('Error al crear el super héroe'));
      }),
    );
  }

  updateHero(payload: UpdateSuperHeroRequest): Observable<SuperHeroView> {
    return this.superHeroService.update(payload).pipe(
      take(1),
      map((updated: SuperHeroResponse) => this.superHeroAdapter.toSuperHeroView(updated)),
      switchMap((updatedHero: SuperHeroView) => {
        this.superHeroFetchResource.reload();
        return of(updatedHero);
      }),
      tap(() => this.notificationBus.notify({ message: 'Super héroe actualizado correctamente' })),
      catchError(() => {
        return throwError(() => new Error('Error al actualizar el super héroe'));
      }),
    );
  }

  deleteHero(id: number): Observable<boolean> {
    return this.superHeroService.delete(id).pipe(
      take(1),
      switchMap(() => {
        this.superHeroFetchResource.reload();
        return of(true);
      }),
      tap(() => this.notificationBus.notify({ message: 'Super héroe eliminado correctamente' })),
      catchError(() => {
        return throwError(() => new Error('Error al eliminar el super héroe'));
      }),
    );
  }
}
