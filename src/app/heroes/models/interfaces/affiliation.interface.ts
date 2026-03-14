import { UniverseEnum } from '../enum/universe.enum';

export interface AffiliationInfo {
  id: number;
  label: string;
  description: string;
  universe: UniverseEnum;
}
