import { SuperHeroResponse } from '../../interfaces/response/super-hero.response.interface';

export type CreateSuperHeroRequest = Omit<SuperHeroResponse, 'id'>;
