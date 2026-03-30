import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuperHeroResponse } from '../models/interfaces/response/super-hero.response.interface';
import { SuperHeroRepository } from '../models/interfaces/super-hero-repository.interface';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-hero.request.type';
import { UpdateSuperHeroRequest } from '../models/types/request/update-super-hero.request.type';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroService implements SuperHeroRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/heroes';

  getAll(): Observable<SuperHeroResponse[]> {
    return this.http.get<SuperHeroResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<SuperHeroResponse | undefined> {
    return this.http.get<SuperHeroResponse>(`${this.baseUrl}/${id}`);
  }

  getByName(name: string): Observable<SuperHeroResponse[]> {
    const normalizedName = name.trim().toLowerCase();
    return this.getAll().pipe(
      map((heroes: SuperHeroResponse[]) =>
        !normalizedName
          ? heroes
          : heroes.filter((h) => h.name.toLowerCase().includes(normalizedName)),
      ),
    );
  }

  create(superHero: CreateSuperHeroRequest): Observable<SuperHeroResponse> {
    return this.http.post<SuperHeroResponse>(this.baseUrl, superHero);
  }

  update(superHero: UpdateSuperHeroRequest): Observable<SuperHeroResponse> {
    if (superHero.id == null) {
      throw new Error('Id requerido para actualizar');
    }
    return this.http.put<SuperHeroResponse>(`${this.baseUrl}/${superHero.id}`, superHero);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
