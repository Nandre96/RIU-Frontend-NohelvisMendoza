import { GenderEnum } from '../enum/gender.enum';
import { Gender } from '../interfaces/gender.interface';

export const MALE_GENDER: Gender = {
  id: GenderEnum.Male,
  name: 'Hombbre',
};

export const FEMALE_GENDER: Gender = {
  id: GenderEnum.Female,
  name: 'Mujer',
};

export const NON_BINARY_GENDER: Gender = {
  id: GenderEnum.NonBinary,
  name: 'No binario',
};

export const UNKNOWN_GENDER: Gender = {
  id: GenderEnum.Unknown,
  name: 'Desconocido',
};

export const GENDERS_INFO: Gender[] = [
  MALE_GENDER,
  FEMALE_GENDER,
  NON_BINARY_GENDER,
  UNKNOWN_GENDER,
];

export const GENDER_INFO: Record<GenderEnum, Gender> = {
  [GenderEnum.Male]: MALE_GENDER,
  [GenderEnum.Female]: FEMALE_GENDER,
  [GenderEnum.NonBinary]: NON_BINARY_GENDER,
  [GenderEnum.Unknown]: UNKNOWN_GENDER,
};
