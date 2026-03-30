import { AffiliationView } from './affiliation.view.interface';
import { PowerView } from './power.view.interface';
import { ProfileView } from './profile.view.interface';
import { PublisherView } from './publisher-view.interface';

export interface SuperHeroView {
  id: number;
  name: string;
  slug: string;
  profile: ProfileView;
  power: PowerView;
  publisher: PublisherView;
  affiliation: AffiliationView[];
  civilOccupation: string;
  weapons: string[];
  abilities: string[];
  weaknesses: string[];
}
