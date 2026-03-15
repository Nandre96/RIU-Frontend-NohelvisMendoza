import { GenderEnum } from '../enum/gender.enum';
import { GenderView } from '../interfaces/view/gender.view.interface';

export const MALE_GENDER: Readonly<GenderView> = {
  id: GenderEnum.Male,
  name: 'Hombre',
};

export const FEMALE_GENDER: Readonly<GenderView> = {
  id: GenderEnum.Female,
  name: 'Mujer',
};

export const NON_BINARY_GENDER: Readonly<GenderView> = {
  id: GenderEnum.NonBinary,
  name: 'No binario',
};

export const UNKNOWN_GENDER: Readonly<GenderView> = {
  id: GenderEnum.Unknown,
  name: 'Desconocido',
};

export const GENDERS_INFO: ReadonlyArray<Readonly<GenderView>> = [
  MALE_GENDER,
  FEMALE_GENDER,
  NON_BINARY_GENDER,
  UNKNOWN_GENDER,
];

export const GENDER_INFO: Readonly<Record<GenderEnum, Readonly<GenderView>>> = {
  [GenderEnum.Male]: MALE_GENDER,
  [GenderEnum.Female]: FEMALE_GENDER,
  [GenderEnum.NonBinary]: NON_BINARY_GENDER,
  [GenderEnum.Unknown]: UNKNOWN_GENDER,
};
