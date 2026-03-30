import { GenderView } from '../view/gender.view.interface';

export interface ProfileView {
  origin: string;
  height: string;
  creationYear: number;
  species: string;
  gender: GenderView;
  primaryColor: string;
  greeting: string;
  logoUrl: string;
}
