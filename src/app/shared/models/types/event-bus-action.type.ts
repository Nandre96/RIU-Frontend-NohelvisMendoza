import { SuperHeroView } from '../../../heroes/models/interfaces/view/super-hero.view.interface';

export type EventBusActionType = 'EDIT' | 'DELETE';
export type HeroeEventBusAction = {
  type: EventBusActionType;
  payload: SuperHeroView;
};
