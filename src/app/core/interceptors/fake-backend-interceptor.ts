import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { SUPER_HEROES_MOCK } from '../../heroes/mocks/super-heroes.mock';
import { SuperHeroResponse } from '../../heroes/models/interfaces/response/super-hero.response.interface';
import { CreateSuperHeroRequest } from '../../heroes/models/types/request/create-super-hero.request.type';
import { UpdateSuperHeroRequest } from '../../heroes/models/types/request/update-super-hero.request.type';
import { HttpRequestMethod } from '../../shared/models/enums/http-request-method.enum';
import { HERO_BY_ID_URL_REGEX } from '../../shared/regex/regex';
import { generateNextId } from '../../shared/utils/generate-next-id.util';

let superHeroes: SuperHeroResponse[] = [...SUPER_HEROES_MOCK];
const DEFAULT_DELAY = 400;
const SIMPLE_DELAY = 200;

export const fakeBackendInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const { url, method, body } = request;
  const isHeroIdUrl = HERO_BY_ID_URL_REGEX.test(url);
  const heroId = Number(url.split('/').pop());
  if (!url.startsWith('/api/heroes')) {
    return next(request);
  }

  const isBasicUrl = url === '/api/heroes';

  if (method === HttpRequestMethod.GET && isBasicUrl) {
    return of(new HttpResponse({ status: 200, body: [...superHeroes] })).pipe(delay(SIMPLE_DELAY));
  }

  if (method === HttpRequestMethod.GET && isHeroIdUrl) {
    const superHero = superHeroes.find((superHero) => superHero.id === heroId);
    return of(new HttpResponse({ status: 200, body: superHero })).pipe(delay(SIMPLE_DELAY));
  }

  if (method === HttpRequestMethod.POST && isBasicUrl) {
    const data = body as CreateSuperHeroRequest;
    const nextId = generateNextId(superHeroes);
    const newHero: SuperHeroResponse = { id: nextId, ...data };
    superHeroes = [...superHeroes, newHero];

    return of(new HttpResponse({ status: 201, body: newHero })).pipe(delay(DEFAULT_DELAY));
  }

  if (method === HttpRequestMethod.PUT && isHeroIdUrl) {
    const data = body as UpdateSuperHeroRequest;
    const heroIndex = superHeroes.findIndex((h) => h.id === heroId);

    if (heroIndex === -1) {
      return throwError(() => new Error('superhéroe no encontrado')).pipe(delay(DEFAULT_DELAY));
    }

    const updated: SuperHeroResponse = { ...superHeroes[heroIndex], ...data, id: heroId };
    superHeroes = superHeroes.map((superHero) => (superHero.id === heroId ? updated : superHero));

    return of(new HttpResponse({ status: 200, body: updated })).pipe(delay(DEFAULT_DELAY));
  }

  if (method === HttpRequestMethod.DELETE && isHeroIdUrl) {
    superHeroes = superHeroes.filter((superHero) => superHero.id !== heroId);
    return of(new HttpResponse({ status: 204 })).pipe(delay(SIMPLE_DELAY));
  }

  return next(request);
};
