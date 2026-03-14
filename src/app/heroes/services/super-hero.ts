import { computed, Injectable, signal } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HEROES_MOCK } from '../mocks/super-heroes.mock';
import { SuperHeroResponse } from '../models/interfaces/response/super-hero.response.interface';
import { SuperHeroRepository } from '../models/interfaces/supe-heroe-repository.interface';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../models/types/request/update-super-heroe.request.type';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroService implements SuperHeroRepository {
  readonly #superHeroe = signal<SuperHeroResponse[]>([...HEROES_MOCK]);
  readonly superHeroes = computed(() => this.#superHeroe());

  getAll(): Observable<SuperHeroResponse[]> {
    return of([...this.superHeroes()]);
  }

  getById(id: number): Observable<SuperHeroResponse | undefined> {
    return this.getAll().pipe(
      map((superHeroes: SuperHeroResponse[]) =>
        superHeroes.find((currentHero: SuperHeroResponse) => currentHero.id === id),
      ),
    );
  }

  getByName(name: string): Observable<SuperHeroResponse[]> {
    const normalizedName = name.trim().toLowerCase();

    return this.getAll().pipe(
      map((superHeroes: SuperHeroResponse[]) => {
        if (!normalizedName) {
          return superHeroes;
        }

        return superHeroes.filter((currentHero: SuperHeroResponse) =>
          currentHero.name.toLowerCase().includes(normalizedName),
        );
      }),
    );
  }

  create(superHeroe: CreateSuperHeroRequest): Observable<SuperHeroResponse> {
    const nextId = this.generateNextId();
    const newSuperHero: SuperHeroResponse = { id: nextId, ...superHeroe };

    this.#superHeroe.update((heroes: SuperHeroResponse[]) => [...heroes, newSuperHero]);

    return of(newSuperHero);
  }

  update(superHeroe: UpdateSuperHeroRequest): Observable<SuperHeroResponse> {
    if (superHeroe.id === null) {
      return throwError(() => new Error('Id requerido para actualizar'));
    }

    const currentHeroe = this.#superHeroe();
    const index = currentHeroe.findIndex((sHero) => sHero.id === superHeroe.id);

    if (index === -1) {
      return throwError(() => new Error('Super heroe no encontrado'));
    }

    const updated: SuperHeroResponse = {
      ...currentHeroe[index],
      ...superHeroe,
      id: superHeroe.id!,
    };

    this.#superHeroe.update((heroes: SuperHeroResponse[]) =>
      heroes.map((sHero: SuperHeroResponse) => (sHero.id === superHeroe.id ? updated : sHero)),
    );

    return of(updated);
  }

  delete(id: number): Observable<void> {
    this.#superHeroe.update((heroes: SuperHeroResponse[]) =>
      heroes.filter((sHero: SuperHeroResponse) => sHero.id !== id),
    );
    return EMPTY;
  }

  private generateNextId(): number {
    const heroes = this.#superHeroe();
    const findLastId = Math.max(...heroes.map((sHero) => sHero.id));
    return heroes.length > 0 ? findLastId + 1 : 1;
  }
}
