import { PowerLevelEnum } from '../../enum/power-level.enum';

export interface PowerView {
  powers: string[];
  level: PowerLevelEnum;
  secretPower: string;
}
