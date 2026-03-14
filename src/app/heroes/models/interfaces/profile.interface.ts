import { Gender } from './gender.interface';

export interface Profile {
  origin: string;
  height: string;
  creationYear: number;
  species: string;
  gender: Gender;
  primaryColor: string;
  logoUrl: string;
}
