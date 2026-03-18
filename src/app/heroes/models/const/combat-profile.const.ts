import { CombatProfileEnum } from '../enum/combat-profile.enum';

export const WEAPON_COMBAT_PROFILE = {
  id: CombatProfileEnum.WEAPON,
  maxItems: 5,
};

export const ABILITY_COMBAT_PROFILE = {
  id: CombatProfileEnum.ABILITY,
  maxItems: 3,
};

export const WEAKNESS_COMBAT_PROFILE = {
  id: CombatProfileEnum.WEAKNESS,
  maxItems: 3,
};

export const POWER_COMBAT_PROFILE = {
  id: CombatProfileEnum.POWER,
  maxItems: 6,
};

export const COMBAT_TYPE_MAX_ITEMS: Record<CombatProfileEnum, number> = {
  [CombatProfileEnum.WEAPON]: WEAPON_COMBAT_PROFILE.maxItems,
  [CombatProfileEnum.ABILITY]: ABILITY_COMBAT_PROFILE.maxItems,
  [CombatProfileEnum.WEAKNESS]: WEAKNESS_COMBAT_PROFILE.maxItems,
  [CombatProfileEnum.POWER]: POWER_COMBAT_PROFILE.maxItems,
};

export const COMBAT_PROFILES_CONFIG = [
  WEAPON_COMBAT_PROFILE,
  ABILITY_COMBAT_PROFILE,
  WEAKNESS_COMBAT_PROFILE,
  POWER_COMBAT_PROFILE,
];
