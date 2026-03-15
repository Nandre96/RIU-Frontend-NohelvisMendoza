import { PowerLevelView } from './power-level.view.interface';

export interface PowerView {
  powers: string;
  level: PowerLevelView;
  secretPower: string;
}
