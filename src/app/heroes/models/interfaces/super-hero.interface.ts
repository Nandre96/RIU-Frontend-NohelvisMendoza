import { AffiliationInfo } from './affiliation.interface';
import { PowerInfo } from './power-info.interface';
import { Profile } from './profile.interface';
import { PublisherInfo } from './publisher.interface';

export interface SuperHero {
  id: number;
  name: string;
  profile: Profile;
  powerInfo: PowerInfo;
  publisher: PublisherInfo;
  affiliation: AffiliationInfo[];
  civilOccupation: string;
  weapons: string[];
  abilities: string[];
  weaknesses: string[];
}
