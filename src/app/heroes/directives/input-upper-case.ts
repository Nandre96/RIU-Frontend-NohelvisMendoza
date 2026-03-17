import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputUpperCase]',
  standalone: true,
})
export class InputUpperCase {
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputValue = event.target as HTMLInputElement;
    const upperCaseValue = inputValue.value.toUpperCase();
    inputValue.value = upperCaseValue;
    this.ngControl?.control?.setValue(upperCaseValue, { emitEvent: false });
  }
}
