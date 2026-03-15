import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { SUPER_HEROES_MOCK } from '../../heroes/mocks/super-heroes.mock';
import { SuperHeroResponse } from '../../heroes/models/interfaces/response/super-hero.response.interface';
import { CreateSuperHeroRequest } from '../../heroes/models/types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../../heroes/models/types/request/update-super-heroe.request.type';
import { generateNextId } from '../../shared/utils/generate-next-id.util';

let superHeroes: SuperHeroResponse[] = [...SUPER_HEROES_MOCK];
const DEFAULT_DELAY = 600;

export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;
  const isHeroIdUrl = /^\/api\/heroes\/\d+$/.test(url);
  const heroId = Number(url.split('/').pop());
  if (!url.startsWith('/api/heroes')) {
    return next(req);
  }

  const isBasicUrl = url === '/api/heroes';

  if (method === 'GET' && isBasicUrl) {
    return of(new HttpResponse({ status: 200, body: [...superHeroes] })).pipe(delay(DEFAULT_DELAY));
  }

  if (method === 'GET' && isHeroIdUrl) {
    const superHero = superHeroes.find((superHeroe) => superHeroe.id === heroId);
    return of(new HttpResponse({ status: 200, body: superHero })).pipe(delay(DEFAULT_DELAY));
  }

  if (method === 'POST' && isBasicUrl) {
    const data = body as CreateSuperHeroRequest;
    const nextId = generateNextId(superHeroes);
    const newHero: SuperHeroResponse = { id: nextId, ...data };
    superHeroes = [...superHeroes, newHero];

    return of(new HttpResponse({ status: 201, body: newHero })).pipe(delay(DEFAULT_DELAY));
  }

  if (method === 'PUT' && isHeroIdUrl) {
    const data = body as UpdateSuperHeroRequest;
    const heroIndex = superHeroes.findIndex((h) => h.id === heroId);

    if (heroIndex === -1) {
      return throwError(() => new Error('Super heroe no encontrado')).pipe(delay(DEFAULT_DELAY));
    }

    const updated: SuperHeroResponse = { ...superHeroes[heroIndex], ...data, id: heroId };
    superHeroes = superHeroes.map((superHeroe) =>
      superHeroe.id === heroId ? updated : superHeroe,
    );

    return of(new HttpResponse({ status: 200, body: updated })).pipe(delay(DEFAULT_DELAY));
  }

  if (method === 'DELETE' && isHeroIdUrl) {
    superHeroes = superHeroes.filter((superHeroe) => superHeroe.id !== heroId);
    return of(new HttpResponse({ status: 204 })).pipe(delay(DEFAULT_DELAY));
  }

  return next(req);
};
