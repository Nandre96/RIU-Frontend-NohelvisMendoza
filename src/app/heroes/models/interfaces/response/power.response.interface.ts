import { PowerLevelEnum } from '../../enum/power-level.enum';

export interface PowerResponse {
  powers: string[];
  level: PowerLevelEnum;
  secretPower: string;
}
