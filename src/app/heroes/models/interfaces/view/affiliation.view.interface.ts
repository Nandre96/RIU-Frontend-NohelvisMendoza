import { UniverseEnum } from '../../enum/universe.enum';

export interface AffiliationView {
  id: number;
  label: string;
  description: string;
  universe: UniverseEnum;
}
