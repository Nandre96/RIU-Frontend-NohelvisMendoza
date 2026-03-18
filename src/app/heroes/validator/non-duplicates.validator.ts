import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function noDuplicatesValidator(control: AbstractControl): ValidationErrors | null {
  const formArray = control as FormArray;

  if (!formArray?.controls) return null;
  const values = formArray.controls
    .map((controlValue) => (controlValue.value ?? '').toString().trim().toLowerCase())
    .filter((normalizedValue) => normalizedValue);

  console.log({ values });

  const hasDuplicates = values.length !== new Set(values).size;

  console.log({ hasDuplicates });
  return hasDuplicates ? { duplicated: true } : null;
}
