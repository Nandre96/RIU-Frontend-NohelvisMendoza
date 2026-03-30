import { Injectable } from '@angular/core';
import { AFFILIATIONS_INFO, UNKNOWN_AFFILIATION_INFO } from '../models/const/affiliation.const';
import { GENDER_INFO, UNKNOWN_GENDER } from '../models/const/gender.const';
import { POWER_LEVEL_META } from '../models/const/power-level.const';
import { PUBLISHER_INFO } from '../models/const/publisher.const';
import { AffiliationEnum } from '../models/enum/affiliation.enum';
import { UniverseEnum } from '../models/enum/universe.enum';
import { SuperHeroResponse } from '../models/interfaces/response/super-hero.response.interface';
import { SuperHeroFormValue } from '../models/interfaces/super-hero-form.interface';
import { AffiliationView } from '../models/interfaces/view/affiliation.view.interface';
import { SuperHeroView } from '../models/interfaces/view/super-hero.view.interface';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-hero.request.type';
import { UpdateSuperHeroRequest } from '../models/types/request/update-super-hero.request.type';

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
        greeting: hero.greeting,
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

  viewToSuperHeroFormValue(hero: SuperHeroView): SuperHeroFormValue {
    return {
      name: hero.name,
      civilOccupation: hero.civilOccupation,
      publisher: hero.publisher,
      affiliation: hero.affiliation,
      weapons: hero.weapons,
      abilities: hero.abilities,
      weaknesses: hero.weaknesses,
      profile: {
        origin: hero.profile.origin,
        species: hero.profile.species,
        height: hero.profile.height,
        creationYear: hero.profile.creationYear,
        greeting: hero.profile.greeting,
        gender: hero.profile.gender,
        primaryColor: hero.profile.primaryColor,
        profileUrl: hero.profile.logoUrl,
      },
      power: {
        powers: hero.power.powers.split(',').map((power) => power.trim()),
        level: hero.power.level,
        secretPower: hero.power.secretPower,
      },
    };
  }

  formValueToPayload(
    formValue: SuperHeroFormValue,
    isEdit: boolean,
    id?: number,
  ): CreateSuperHeroRequest | UpdateSuperHeroRequest {
    const basePayload = {
      ...formValue,
      profile: {
        ...formValue.profile,
        gender: formValue.profile.gender.id,
        logoUrl: formValue.profile.profileUrl,
      },
      greeting: formValue.profile.greeting,
      publisherId: formValue.publisher.id,
      power: {
        ...formValue.power,
        level: formValue.power.level.id,
      },
      affiliation: formValue.affiliation.map((aff: AffiliationView) => aff.id),
    };

    if (isEdit) {
      return {
        ...basePayload,
        id: id!,
      } as UpdateSuperHeroRequest;
    }
    return basePayload as CreateSuperHeroRequest;
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
