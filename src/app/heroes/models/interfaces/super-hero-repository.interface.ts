import { Observable } from 'rxjs';
import { CreateSuperHeroRequest } from '../types/request/create-super-hero.request.type';
import { UpdateSuperHeroRequest } from '../types/request/update-super-hero.request.type';
import { SuperHeroResponse } from './response/super-hero.response.interface';

export interface SuperHeroRepository {
  getAll(): Observable<SuperHeroResponse[]>;
  getById(id: number): Observable<SuperHeroResponse | undefined>;
  getByName(name: string): Observable<SuperHeroResponse[]>;
  create(superHero: CreateSuperHeroRequest): Observable<SuperHeroResponse>;
  update(superHero: UpdateSuperHeroRequest): Observable<SuperHeroResponse>;
  delete(id: number): Observable<void>;
}
