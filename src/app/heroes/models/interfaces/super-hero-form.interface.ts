import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AffiliationView } from './view/affiliation.view.interface';
import { GenderView } from './view/gender.view.interface';
import { PowerLevelView } from './view/power-level.view.interface';
import { PublisherView } from './view/publisher-view.interface';

export interface SuperHeroFormValue {
  name: string;
  civilOccupation: string;
  publisher: PublisherView;
  affiliation: AffiliationView[];
  weapons: string[];
  abilities: string[];
  weaknesses: string[];
  profile: {
    origin: string;
    species: string;
    height: string;
    creationYear: number;
    gender: GenderView;
    primaryColor: string;
    profileUrl: string;
  };
  power: {
    powers: string[];
    level: PowerLevelView;
    secretPower: string;
  };
}

export type SuperHeroFormGroup = FormGroup<{
  name: FormControl<string>;
  civilOccupation: FormControl<string>;
  publisher: FormControl<PublisherView>;
  affiliation: FormControl<AffiliationView[]>;
  weapons: FormArray<FormControl<string>>;
  abilities: FormArray<FormControl<string>>;
  weaknesses: FormArray<FormControl<string>>;
  profile: FormGroup<{
    origin: FormControl<string | null>;
    species: FormControl<string>;
    height: FormControl<string>;
    creationYear: FormControl<number>;
    gender: FormControl<GenderView>;
    primaryColor: FormControl<string>;
    profileUrl: FormControl<string>;
  }>;
  power: FormGroup<{
    powers: FormArray<FormControl<string>>;
    level: FormControl<PowerLevelView>;
    secretPower: FormControl<string>;
  }>;
}>;
