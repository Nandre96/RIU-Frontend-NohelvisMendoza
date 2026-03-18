import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '../../../shared/components/title/title';
import {
  HEIGHT_REGEX,
  IMAGE_URL_REGEX,
  LETTER_NUMBER_REGEX,
  LETTER_OR_NA_REGEX,
  LETTER_REGEX,
} from '../../../shared/regex/regex';
import { ErrorMessageForm } from '../../directives/error-message-form';
import { InputUpperCase } from '../../directives/input-upper-case';
import {
  AFFILIATION_OPTIONS,
  UNKNOWN_AFFILIATION_INFO,
} from '../../models/const/affiliation.const';
import { COMBAT_TYPE_MAX_ITEMS } from '../../models/const/combat-profile.const';
import { GENDERS_INFO, UNKNOWN_GENDER } from '../../models/const/gender.const';
import { POWERS_INFO, UNKNOWN_POWER_LEVEL_META } from '../../models/const/power-level.const';
import { PUBLISHERS_INFO, UNKNOWN_PUBLISHER_INFO } from '../../models/const/publisher.const';
import { CombatProfileEnum } from '../../models/enum/combat-profile.enum';
import {
  SuperHeroFormGroup,
  SuperHeroFormValue,
} from '../../models/interfaces/super-heroe-form.interface';
import { CreateSuperHeroRequest } from '../../models/types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../../models/types/request/update-super-heroe.request.type';
import { SuperHeroViewService } from '../../services/super-hero-view';

@Component({
  selector: 'app-super-hero-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    InputUpperCase,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    ErrorMessageForm,
    MatIconModule,
    MatBadgeModule,
    Title,
    MatButtonModule,
    MatTooltip,
  ],
  templateUrl: './super-hero-form.html',
  styleUrl: './super-hero-form.css',
})
export class SuperHeroForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly superHeroesViewService = inject(SuperHeroViewService);
  isEditMode = false;
  superHeroToEdit = this.superHeroesViewService.selectedSuperHero();
  superHeroFG!: SuperHeroFormGroup;
  PUBLISHERS_INFO = PUBLISHERS_INFO;
  GENDERS_INFO = GENDERS_INFO;
  POWERS_INFO = POWERS_INFO;
  AFFILIATION_OPTIONS = AFFILIATION_OPTIONS;
  CombatProfileEnum = CombatProfileEnum;

  constructor() {
    this.superHeroInitForm();

    effect(() => {
      const selectedSuperHero = this.superHeroesViewService.selectedSuperToFormValue();
      if (selectedSuperHero) {
        this.superHeroFG.patchValue(selectedSuperHero);
        this.setArrayValues(this.weaponsArray, selectedSuperHero.weapons ?? []);
        this.setArrayValues(this.abilitiesArray, selectedSuperHero.abilities ?? []);
        this.setArrayValues(this.weaknessesArray, selectedSuperHero.weaknesses ?? []);
        this.setArrayValues(this.powersArray, selectedSuperHero.power?.powers ?? []);

        this.superHeroFG.markAllAsTouched();
      }
    });

    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      this.isEditMode = !!id;

      if (this.isEditMode) {
        this.superHeroesViewService.selectHero(Number(id));
        return;
      }

      this.superHeroesViewService.selectHero(null);
    });
  }

  get weaponsArray() {
    return this.superHeroFG.controls.weapons;
  }

  get abilitiesArray() {
    return this.superHeroFG.controls.abilities;
  }

  get weaknessesArray() {
    return this.superHeroFG.controls.weaknesses;
  }
  get powersArray() {
    return this.superHeroFG.controls.power.controls.powers;
  }

  addArrayItem(array: FormArray<FormControl<string>>, type: CombatProfileEnum): void {
    if (array.length < COMBAT_TYPE_MAX_ITEMS[type]) {
      array.push(
        this.fb.nonNullable.control('', [
          Validators.required,
          Validators.pattern(LETTER_NUMBER_REGEX),
        ]),
      );
      return;
    }

    this.superHeroesViewService.showMessage(
      `Solo se permiten hasta (${COMBAT_TYPE_MAX_ITEMS[type]}) items de ${type}`,
    );
  }

  removeArrayItem(array: FormArray<FormControl<string>>, index: number): void {
    array.length > 1 && array.removeAt(index);
  }

  saveOrUpdate(): void {
    const formValue = this.superHeroFG.getRawValue() as SuperHeroFormValue;
    console.log({ formValue });
    if (this.superHeroFG.invalid) {
      this.superHeroFG.markAllAsTouched();
      return;
    }

    const payload = this.superHeroesViewService.createPayload(formValue, this.isEditMode);

    if (this.isEditMode) {
      this.superHeroesViewService.updateHero(payload as UpdateSuperHeroRequest);
      this.router.navigate(['/heroes']);
      return;
    }

    this.superHeroesViewService.createHero(payload as CreateSuperHeroRequest);
    this.router.navigate(['/heroes']);
  }

  deleteHero(): void {
    if (!this.superHeroToEdit) return;

    this.superHeroesViewService.deleteHero(this.superHeroToEdit.id);
    this.router.navigate(['/heroes']);
  }

  private setArrayValues(array: FormArray<FormControl<string>>, values: string[]): void {
    array.clear();
    values.forEach((valueInfo) =>
      array.push(
        this.fb.nonNullable.control(valueInfo, [
          Validators.required,
          Validators.pattern(LETTER_NUMBER_REGEX),
        ]),
      ),
    );
  }

  private createStringArray(values: string[] = []): FormArray<FormControl<string>> {
    return this.fb.array(
      values.map((value: string) => this.fb.nonNullable.control(value, Validators.required)),
      Validators.required,
    );
  }

  private superHeroInitForm(): void {
    this.superHeroFG = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.pattern(LETTER_NUMBER_REGEX)]],
      civilOccupation: ['N/A', [Validators.pattern(LETTER_OR_NA_REGEX)]],
      publisher: [UNKNOWN_PUBLISHER_INFO, Validators.required],
      affiliation: [[UNKNOWN_AFFILIATION_INFO], Validators.required],
      weapons: this.createStringArray(['']),
      abilities: this.createStringArray(['']),
      weaknesses: this.createStringArray(['']),
      profile: this.fb.nonNullable.group({
        origin: ['', [Validators.required, Validators.pattern(LETTER_NUMBER_REGEX)]],
        species: ['', [Validators.required, Validators.pattern(LETTER_OR_NA_REGEX)]],
        height: ['', [Validators.required, Validators.pattern(HEIGHT_REGEX)]],
        creationYear: [
          100,
          [Validators.required, Validators.min(100), Validators.max(new Date().getFullYear())],
        ],
        gender: [UNKNOWN_GENDER, Validators.required],
        primaryColor: ['#000000', [Validators.required]],
        profileUrl: ['', [Validators.required, Validators.pattern(IMAGE_URL_REGEX)]],
      }),
      power: this.fb.nonNullable.group({
        powers: this.createStringArray(['']),
        level: this.fb.nonNullable.control(UNKNOWN_POWER_LEVEL_META, {
          validators: [Validators.required],
        }),
        secretPower: ['N/A', [Validators.required, Validators.pattern(LETTER_OR_NA_REGEX)]],
      }),
    }) as SuperHeroFormGroup;
  }
}
