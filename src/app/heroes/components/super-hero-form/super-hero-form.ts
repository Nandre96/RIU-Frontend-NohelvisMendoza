import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  HEIGHT_REGEX,
  IMAGE_URL_REGEX,
  LETTER_NUMBER_REGEX,
  LETTER_OR_NA_REGEX,
  LETTER_REGEX,
} from '../../../shared/regex/regex';
import { ErrorMessageForm } from '../../directives/error-message-form';
import { InputUpperCase } from '../../directives/input-upper-case';
import { UNKNOWN_AFFILIATION_INFO } from '../../models/const/affiliation.const';
import { GENDERS_INFO, UNKNOWN_GENDER } from '../../models/const/gender.const';
import { POWERS_INFO, UNKNOWN_POWER_LEVEL_META } from '../../models/const/power-level.const';
import { PUBLISHERS_INFO, UNKNOWN_PUBLISHER_INFO } from '../../models/const/publisher.const';
import { SuperHeroFormGroup } from '../../models/interfaces/super-heroe-form.interface';

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
  ],
  templateUrl: './super-hero-form.html',
  styleUrl: './super-hero-form.css',
})
export class SuperHeroForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  superHeroFG!: SuperHeroFormGroup;
  PUBLISHERS_INFO = PUBLISHERS_INFO;
  GENDERS_INFO = GENDERS_INFO;
  POWERS_INFO = POWERS_INFO;

  ngOnInit(): void {
    this.superHeroInitForm();
  }

  private superHeroInitForm(): void {
    this.superHeroFG = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.pattern(LETTER_NUMBER_REGEX)]],
      civilOccupation: ['N/A', [Validators.pattern(LETTER_OR_NA_REGEX)]],
      publisher: [UNKNOWN_PUBLISHER_INFO, Validators.required],
      affiliation: [[UNKNOWN_AFFILIATION_INFO], Validators.required],
      weapons: this.fb.nonNullable.control<string[]>([], { validators: [Validators.required] }),
      abilities: this.fb.nonNullable.control<string[]>([], { validators: [Validators.required] }),
      weaknesses: this.fb.nonNullable.control<string[]>([], { validators: [Validators.required] }),
      profile: this.fb.nonNullable.group({
        origin: ['', [Validators.required, Validators.pattern(LETTER_NUMBER_REGEX)]],
        species: ['', [Validators.required, Validators.pattern(LETTER_REGEX)]],
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
        powers: this.fb.nonNullable.control<string[]>([], { validators: [Validators.required] }),
        level: this.fb.nonNullable.control(UNKNOWN_POWER_LEVEL_META, {
          validators: [Validators.required],
        }),
        secretPower: ['N/A', [Validators.required, Validators.pattern(LETTER_OR_NA_REGEX)]],
      }),
    }) as SuperHeroFormGroup;
  }
}
