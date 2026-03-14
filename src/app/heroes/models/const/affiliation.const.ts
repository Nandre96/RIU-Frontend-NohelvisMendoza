import { AffiliationEnum } from '../enum/affiliation.enum';
import { UniverseEnum } from '../enum/universe.enum';
import { AffiliationView } from '../interfaces/view/affiliation.view.interface';

export const JUSTICE_LEAGUE_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.JUSTICE_LEAGUE,
  label: 'Justice League',
  description: 'El equipo de superhéroes más poderoso del universo DC.',
  universe: UniverseEnum.DC,
};

export const BAT_FAMILY_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.BAT_FAMILY,
  label: 'Bat-Family',
  description: 'Aliados y protegidos de Batman en Gotham City.',
  universe: UniverseEnum.DC,
};

export const GREEN_LANTERN_CORPS_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.GREEN_LANTERN_CORPS,
  label: 'Green Lantern Corps',
  description: 'Cuerpo policial intergaláctico que usa anillos de poder.',
  universe: UniverseEnum.DC,
};

export const AVENGERS_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.AVENGERS,
  label: 'Avengers',
  description: 'El equipo de superhéroes más icónico del universo Marvel.',
  universe: UniverseEnum.MARVEL,
};

export const FANTASTIC_FOUR_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.FANTASTIC_FOUR,
  label: 'Fantastic Four',
  description: 'Primer equipo de superhéroes de Marvel.',
  universe: UniverseEnum.MARVEL,
};

export const ILLUMINATI_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.ILLUMINATI,
  label: 'Illuminati',
  description: 'Grupo secreto de las mentes más brillantes de Marvel.',
  universe: UniverseEnum.MARVEL,
};

export const DEFENDERS_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.DEFENDERS,
  label: 'Defenders',
  description: 'Equipo no oficial de héroes callejeros de Marvel.',
  universe: UniverseEnum.MARVEL,
};

export const X_MEN_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.X_MEN,
  label: 'X-Men',
  description: 'Equipo de mutantes que lucha por la paz entre humanos y mutantes.',
  universe: UniverseEnum.MARVEL,
};

export const SHIELD_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.SHIELD,
  label: 'S.H.I.E.L.D.',
  description: 'Agencia de inteligencia y seguridad internacional.',
  universe: UniverseEnum.MARVEL,
};

export const GUARDIANS_OF_THE_GALAXY_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.GUARDIANS_OF_THE_GALAXY,
  label: 'Guardians of the Galaxy',
  description: 'Equipo de forajidos que protege el universo.',
  universe: UniverseEnum.MARVEL,
};

export const UNKNOWN_AFFILIATION_INFO: Readonly<AffiliationView> = {
  id: AffiliationEnum.UNKNOWN,
  label: 'Unknown',
  description: 'Desconocida o no disponible.',
  universe: UniverseEnum.UNKNOWN,
};

export const AFILIACIONES_INFO: Readonly<Record<AffiliationEnum, Readonly<AffiliationView>>> = {
  [AffiliationEnum.JUSTICE_LEAGUE]: JUSTICE_LEAGUE_AFFILIATION_INFO,
  [AffiliationEnum.BAT_FAMILY]: BAT_FAMILY_AFFILIATION_INFO,
  [AffiliationEnum.GREEN_LANTERN_CORPS]: GREEN_LANTERN_CORPS_AFFILIATION_INFO,
  [AffiliationEnum.AVENGERS]: AVENGERS_AFFILIATION_INFO,
  [AffiliationEnum.FANTASTIC_FOUR]: FANTASTIC_FOUR_AFFILIATION_INFO,
  [AffiliationEnum.ILLUMINATI]: ILLUMINATI_AFFILIATION_INFO,
  [AffiliationEnum.DEFENDERS]: DEFENDERS_AFFILIATION_INFO,
  [AffiliationEnum.X_MEN]: X_MEN_AFFILIATION_INFO,
  [AffiliationEnum.SHIELD]: SHIELD_AFFILIATION_INFO,
  [AffiliationEnum.GUARDIANS_OF_THE_GALAXY]: GUARDIANS_OF_THE_GALAXY_AFFILIATION_INFO,
  [AffiliationEnum.UNKNOWN]: UNKNOWN_AFFILIATION_INFO,
};
