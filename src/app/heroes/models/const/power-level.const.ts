import { PowerLevelEnum } from '../enum/power-level.enum';
import { PowerLevelView } from '../interfaces/view/power-level.view.interface';

const LOW_POWER_LEVEL_META: Readonly<PowerLevelView> = {
  label: 'Bajo',
  color: '#10B981',
};

const MEDIUM_POWER_LEVEL_META: Readonly<PowerLevelView> = {
  label: 'Medio',
  color: '#D97706',
};

const HIGH_POWER_LEVEL_META: Readonly<PowerLevelView> = {
  label: 'Alto',
  color: '#EA580C',
};

const GODLIKE_POWER_LEVEL_META: Readonly<PowerLevelView> = {
  label: 'Godlike',
  color: '#DC2626',
};

export const UNKNOWN_POWER_LEVEL_META: Readonly<PowerLevelView> = {
  label: 'Desconocido',
  color: '#6B7280',
};

export const POWER_LEVEL_META: Readonly<Record<PowerLevelEnum, Readonly<PowerLevelView>>> = {
  [PowerLevelEnum.LOW]: LOW_POWER_LEVEL_META,
  [PowerLevelEnum.MEDIUM]: MEDIUM_POWER_LEVEL_META,
  [PowerLevelEnum.HIGH]: HIGH_POWER_LEVEL_META,
  [PowerLevelEnum.GODLIKE]: GODLIKE_POWER_LEVEL_META,
  [PowerLevelEnum.UNKNOWN]: UNKNOWN_POWER_LEVEL_META,
};

export const POWERS_INFO: ReadonlyArray<Readonly<PowerLevelView>> = [
  LOW_POWER_LEVEL_META,
  MEDIUM_POWER_LEVEL_META,
  HIGH_POWER_LEVEL_META,
  GODLIKE_POWER_LEVEL_META,
  UNKNOWN_POWER_LEVEL_META,
];
