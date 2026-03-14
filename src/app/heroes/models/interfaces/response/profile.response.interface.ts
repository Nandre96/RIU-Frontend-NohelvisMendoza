import { GenderEnum } from '../../enum/gender.enum';

export interface ProfileResponse {
  origin: string;
  height: string;
  creationYear: number;
  species: string;
  gender: GenderEnum;
  primaryColor: string;
  logoUrl: string;
}
