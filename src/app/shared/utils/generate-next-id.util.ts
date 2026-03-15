import { SuperHeroResponse } from '../../heroes/models/interfaces/response/super-hero.response.interface';

export function generateNextId(heroes: SuperHeroResponse[]): number {
  if (heroes.length === 0) {
    return 1;
  }

  const lastId = Math.max(...heroes.map((sHero) => sHero.id));
  return lastId + 1;
}
