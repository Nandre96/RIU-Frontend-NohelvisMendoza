import { UniverseEnum } from '../enum/universe.enum';
import { PublisherView } from '../interfaces/view/publisher-view.interface';
import { PublisherType } from '../types/publisher.type';

export const DC_PUBLISHER_INFO: Readonly<PublisherView> = {
  id: 1 as PublisherType,
  label: 'DC Comics',
  description: 'Editorial estadounidense detrás de Superman, Batman y Wonder Woman.',
  foundationYear: 1934,
  urlLogo:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl714bqRfNaysc1vlehO79uUEln_Mf2bcVxw&s',
};

export const MARVEL_PUBLISHER_INFO: Readonly<PublisherView> = {
  id: 2 as PublisherType,
  label: 'Marvel Comics',
  description: 'Editorial estadounidense detrás de Spider-Man, Iron Man y los X-Men.',
  foundationYear: 1939,
  urlLogo:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM5MI2Y4rAeUp8F_dyt5kKtP7CB0FY7rUkCw&s',
};

export const UNKNOWN_PUBLISHER_INFO: Readonly<PublisherView> = {
  id: 0 as PublisherType,
  label: 'Desconocido',
  description: 'La información de la editorial no está disponible.',
  foundationYear: 0,
  urlLogo: '',
};

export const PUBLISHERS_INFO: Readonly<PublisherView[]> = [
  DC_PUBLISHER_INFO,
  MARVEL_PUBLISHER_INFO,
  UNKNOWN_PUBLISHER_INFO,
];

export const PUBLISHER_INFO: Readonly<Record<UniverseEnum, PublisherView>> = {
  [UniverseEnum.DC]: DC_PUBLISHER_INFO,
  [UniverseEnum.MARVEL]: MARVEL_PUBLISHER_INFO,
  [UniverseEnum.UNKNOWN]: UNKNOWN_PUBLISHER_INFO,
};
