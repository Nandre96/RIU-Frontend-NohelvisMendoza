import { PowerLevel } from '../enum/power-level.enum';

export interface PowerInfo {
  powers: string[];
  level: PowerLevel;
  secretPower: string;
}
