import { Component, computed, inject, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
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
import { filter, take } from 'rxjs';
import { Title } from '../../../shared/components/title/title';
import {
  GREETING_REGEX,
  HEIGHT_REGEX,
  IMAGE_URL_REGEX,
  LETTER_NUMBER_REGEX,
  LETTER_OR_NA_REGEX,
  ONLY_NUMBERS_3_4_REGEX,
} from '../../../shared/regex/regex';
import { NotificationEventBus } from '../../../shared/services/notification-event-bus';
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
} from '../../models/interfaces/super-hero-form.interface';
import { CreateSuperHeroRequest } from '../../models/types/request/create-super-hero.request.type';
import { UpdateSuperHeroRequest } from '../../models/types/request/update-super-hero.request.type';
import { SuperHeroActionService } from '../../services/super-hero-action';
import { SuperHeroViewService } from '../../services/super-hero-view';
import { noDuplicatesValidator } from '../../validator/non-duplicates.validator';

@Component({
  selector: 'app-super-hero-form',
  imports: [
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
export class SuperHeroForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly superHeroesViewService = inject(SuperHeroViewService);
  private readonly superHeroActionService = inject(SuperHeroActionService);
  private readonly notificationBus = inject(NotificationEventBus);
  readonly superHeroToEdit = computed(() => this.superHeroesViewService.selectedSuperHero());
  superHeroAsFormValue = toObservable(this.superHeroesViewService.selectedSuperToFormValue);
  isEditMode = false;
  superHeroFG: SuperHeroFormGroup = this.superHeroInitForm();
  PUBLISHERS_INFO = PUBLISHERS_INFO;
  GENDERS_INFO = GENDERS_INFO;
  POWERS_INFO = POWERS_INFO;
  AFFILIATION_OPTIONS = AFFILIATION_OPTIONS;
  CombatProfileEnum = CombatProfileEnum;

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

  ngOnInit() {
    this.setupSuperHeroForm();
    this.superHeroAsFormValue
      .pipe(
        filter((superHeroF: SuperHeroFormValue | null) => superHeroF !== null),
        take(1),
      )
      .subscribe({
        next: (selectedSuperToFormValue: SuperHeroFormValue) =>
          this.patchFormWithSelectedHero(selectedSuperToFormValue),
      });
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

    this.notificationBus.notify({
      message: `Solo se permiten hasta (${COMBAT_TYPE_MAX_ITEMS[type]}) items de ${type}`,
    });
  }

  removeArrayItem(array: FormArray<FormControl<string>>, index: number): void {
    array.length > 1 && array.removeAt(index);
  }

  saveOrUpdate(): void {
    const formValue = this.superHeroFG.getRawValue() as SuperHeroFormValue;

    if (!this.isFormValid()) return;

    const payload = this.superHeroesViewService.createPayload(formValue, this.isEditMode);
    const actionType = this.isEditMode ? 'UPDATE' : 'CREATE';
    const errorMsg =
      actionType === 'UPDATE'
        ? 'Error al actualizar el super héroe'
        : 'Error al crear el super héroe';

    this.superHeroActionService
      .onAction({
        type: actionType,
        payload: payload as UpdateSuperHeroRequest | CreateSuperHeroRequest,
      })
      .subscribe({
        next: () => this.router.navigate(['/heroes']),
        error: (error) =>
          this.notificationBus.notify({
            message: error.message || errorMsg,
          }),
      });
  }

  deleteHero(): void {
    if (!this.superHeroToEdit()) return;

    const hero = this.superHeroToEdit()!;

    this.superHeroActionService.onAction({ type: 'DELETE', payload: hero }).subscribe({
      error: (error) =>
        this.notificationBus.notify({
          message: error.message || 'Error al eliminar el super héroe',
        }),
    });
  }

  goBack() {
    this.router.navigate(['/heroes']);
  }

  private isFormValid(): boolean {
    const formValue = this.superHeroFG.getRawValue() as SuperHeroFormValue;
    if (this.superHeroFG.invalid) {
      this.notificationBus.notify({ message: 'Por favor, complete correctamente el formulario' });
      this.superHeroFG.markAllAsTouched();
      return false;
    }

    if (!formValue.name.trim()) {
      this.notificationBus.notify({ message: 'El nombre es requerido' });
      this.superHeroFG.controls.name.setErrors({ required: true });
      return false;
    }

    const nameExists = this.superHeroesViewService
      .superHeroes()
      .some(
        (hero) =>
          hero.name.toLowerCase() === formValue.name.trim().toLowerCase() && !this.isEditMode,
      );

    if (nameExists) {
      this.notificationBus.notify({ message: 'Ya existe un super héroe con ese nombre' });
      this.superHeroFG.controls.name.setErrors({ duplicate: true });
      return false;
    }

    return true;
  }

  private setArrayValues(array: FormArray<FormControl<string>>, values: string[]): void {
    array.clear();
    values.forEach((valueInfo: string) =>
      array.push(
        this.fb.nonNullable.control(valueInfo, [
          Validators.required,
          Validators.pattern(LETTER_NUMBER_REGEX),
          noDuplicatesValidator.bind(this),
        ]),
      ),
    );
  }

  private createStringArray(values: string[] = []): FormArray<FormControl<string>> {
    const createControlByValueInfo = values.map((value: string) =>
      this.fb.nonNullable.control(value, [Validators.required]),
    );

    return this.fb.array(createControlByValueInfo, [
      Validators.required,
      noDuplicatesValidator.bind(this),
    ]);
  }

  private superHeroInitForm(): SuperHeroFormGroup {
    return this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.pattern(LETTER_NUMBER_REGEX)]],
      civilOccupation: ['N/A', [Validators.pattern(LETTER_OR_NA_REGEX)]],
      publisher: [UNKNOWN_PUBLISHER_INFO, Validators.required],
      affiliation: [[UNKNOWN_AFFILIATION_INFO], Validators.required],
      weapons: this.createStringArray(['']),
      abilities: this.createStringArray(['']),
      weaknesses: this.createStringArray(['']),
      profile: this.fb.group({
        origin: ['', [Validators.required, Validators.pattern(LETTER_NUMBER_REGEX)]],
        species: ['', [Validators.required, Validators.pattern(LETTER_OR_NA_REGEX)]],
        height: ['', [Validators.required, Validators.pattern(HEIGHT_REGEX)]],
        greeting: ['Hola', [Validators.pattern(GREETING_REGEX)]],
        creationYear: [
          100,
          [
            Validators.required,
            Validators.pattern(ONLY_NUMBERS_3_4_REGEX),
            Validators.min(100),
            Validators.max(new Date().getFullYear()),
            Validators.minLength(3),
            Validators.maxLength(4),
          ],
        ],
        gender: [UNKNOWN_GENDER, Validators.required],
        primaryColor: ['#000000', [Validators.required]],
        profileUrl: ['', [Validators.pattern(IMAGE_URL_REGEX)]],
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

  setupSuperHeroForm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    if (this.isEditMode) {
      this.superHeroesViewService.selectHero(Number(id));
    } else {
      this.superHeroesViewService.selectHero(null);
      this.superHeroFG = this.superHeroInitForm();
    }
  }

  private patchFormWithSelectedHero(selectedSuperHero: SuperHeroFormValue): void {
    this.superHeroFG.patchValue(selectedSuperHero);
    this.setArrayValues(this.weaponsArray, selectedSuperHero.weapons ?? []);
    this.setArrayValues(this.abilitiesArray, selectedSuperHero.abilities ?? []);
    this.setArrayValues(this.weaknessesArray, selectedSuperHero.weaknesses ?? []);
    this.setArrayValues(this.powersArray, selectedSuperHero.power?.powers ?? []);
    this.superHeroFG.markAllAsTouched();
  }
}
