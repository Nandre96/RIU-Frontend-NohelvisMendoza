import { SuperHeroView } from '../../../heroes/models/interfaces/view/super-hero.view.interface';
import { CreateSuperHeroRequest } from '../../../heroes/models/types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../../../heroes/models/types/request/update-super-heroe.request.type';

export type EventBusActionType = 'CREATE' | 'UPDATE' | 'EDIT_MODE' | 'DELETE';
export type HeroeEventBusAction = {
  type: EventBusActionType;
  payload: SuperHeroView | UpdateSuperHeroRequest | CreateSuperHeroRequest;
};
