import { SuperHeroView } from '../interfaces/view/super-hero.view.interface';
import { CreateSuperHeroRequest } from './request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from './request/update-super-heroe.request.type';

export type SuperHeroActionType = 'CREATE' | 'UPDATE' | 'EDIT_MODE' | 'DELETE';
export type SuperHeroEventAction = {
  type: SuperHeroActionType;
  payload: SuperHeroView | UpdateSuperHeroRequest | CreateSuperHeroRequest;
};
