import { PowerResponse } from './power.response.interface';
import { ProfileResponse } from './profile.response.interface';

export interface SuperHeroResponse {
  id: number;
  name: string;
  profile: ProfileResponse;
  power: PowerResponse;
  publisherId: number;
  affiliation: number[];
  civilOccupation: string;
  weapons: string[];
  abilities: string[];
  weaknesses: string[];
}
