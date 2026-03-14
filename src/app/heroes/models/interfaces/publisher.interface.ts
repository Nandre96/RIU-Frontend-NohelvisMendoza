import { UniverseEnum } from '../enum/universe.enum';

export interface PublisherInfo {
  id: UniverseEnum.DC | UniverseEnum.MARVEL | UniverseEnum.UNKNOWN;
  label: string;
  description: string;
  foundationYear: number;
  urlLogo?: string;
}
