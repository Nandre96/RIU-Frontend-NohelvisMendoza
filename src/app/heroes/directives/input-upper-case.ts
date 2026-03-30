import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appInputUpperCase]',
  standalone: true,
  host: {
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
  },
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: InputUpperCase, multi: true }],
})
export class InputUpperCase implements ControlValueAccessor {
  private readonly inputElementRef = inject(ElementRef<HTMLInputElement>);
  private readonly renderer = inject(Renderer2);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const { selectionStart, selectionEnd, value } = input;

    const upperCasedInput = value.toUpperCase();

    this.renderer.setProperty(input, 'value', upperCasedInput);
    input.setSelectionRange(selectionStart, selectionEnd);
    this.onChange(upperCasedInput);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.renderer.setProperty(
      this.inputElementRef.nativeElement,
      'value',
      value ? value.toUpperCase() : '',
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
