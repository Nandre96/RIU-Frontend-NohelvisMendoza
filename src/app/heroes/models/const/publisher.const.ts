import { UniverseEnum } from '../enum/universe.enum';
import { PublisherView } from '../interfaces/view/publisher-view.interface';
import { PublisherType } from '../types/publisher.type';

export const DC_PUBLISHER_INFO: Readonly<PublisherView> = {
  id: 1 as PublisherType,
  label: 'DC Comics',
  description: 'Editorial estadounidense detrás de Superman, Batman y Wonder Woman.',
  foundationYear: 1934,
  urlLogo: 'https://i.pinimg.com/1200x/a0/34/e8/a034e83a560bacdc8ff85a2a304558b6.jpg',
};

export const MARVEL_PUBLISHER_INFO: Readonly<PublisherView> = {
  id: 2 as PublisherType,
  label: 'Marvel Comics',
  description: 'Editorial estadounidense detrás de Spider-Man, Iron Man y los X-Men.',
  foundationYear: 1939,
  urlLogo: 'https://i.pinimg.com/736x/ef/64/ea/ef64ea60d6dbee53c4dbf6a5fcb3ca10.jpg',
};

export const UNKNOWN_PUBLISHER_INFO: Readonly<PublisherView> = {
  id: 0 as PublisherType,
  label: 'Desconocido',
  description: 'La información de la editorial no está disponible.',
  foundationYear: 0,
  urlLogo: 'https://i.pinimg.com/1200x/ff/70/1e/ff701efdad20396b0efdcd99495bf8e4.jpg',
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
