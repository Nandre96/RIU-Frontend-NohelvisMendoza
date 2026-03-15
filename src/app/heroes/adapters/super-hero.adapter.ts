import { Injectable } from '@angular/core';
import { AFFILIATIONS_INFO, UNKNOWN_AFFILIATION_INFO } from '../models/const/affiliation.const';
import { GENDER_INFO, UNKNOWN_GENDER } from '../models/const/gender.const';
import { POWER_LEVEL_META } from '../models/const/power-level.const';
import { PUBLISHER_INFO } from '../models/const/publisher.const';
import { AffiliationEnum } from '../models/enum/affiliation.enum';
import { UniverseEnum } from '../models/enum/universe.enum';
import { SuperHeroResponse } from '../models/interfaces/response/super-hero.response.interface';
import { SuperHeroView } from '../models/interfaces/view/super-hero.view.interface';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroAdapterService {
  toSuperHeroView(hero: SuperHeroResponse): SuperHeroView {
    const publisher =
      PUBLISHER_INFO[hero.publisherId as UniverseEnum] ?? PUBLISHER_INFO[UniverseEnum.UNKNOWN];

    return {
      id: hero.id,
      name: hero.name,
      slug: this.slugify(hero.name),
      profile: {
        ...hero.profile,
        gender: GENDER_INFO[hero.profile.gender] ?? UNKNOWN_GENDER,
      },
      power: {
        powers: hero.power.powers.join(', '),
        level: POWER_LEVEL_META[hero.power.level],
        secretPower: hero.power.secretPower,
      },
      publisher,
      affiliation: hero.affiliation.map(
        (id) => AFFILIATIONS_INFO[id as AffiliationEnum] ?? UNKNOWN_AFFILIATION_INFO,
      ),
      civilOccupation: hero.civilOccupation,
      weapons: hero.weapons,
      abilities: hero.abilities,
      weaknesses: hero.weaknesses,
    };
  }

  private slugify(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
