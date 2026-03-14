import { Observable } from 'rxjs';
import { CreateSuperHeroRequest } from '../types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../types/request/update-super-heroe.request.type';
import { SuperHeroResponse } from './response/super-hero.response.interface';

export interface SuperHeroRepository {
  getAll(): Observable<SuperHeroResponse[]>;
  getById(id: number): Observable<SuperHeroResponse | undefined>;
  getByName(nombre: string): Observable<SuperHeroResponse[]>;
  create(superHeroe: CreateSuperHeroRequest): Observable<SuperHeroResponse>;
  update(heroe: UpdateSuperHeroRequest): Observable<SuperHeroResponse>;
  delete(id: number): Observable<void>;
}
