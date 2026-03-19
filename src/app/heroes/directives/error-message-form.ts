import { Directive, DoCheck, ElementRef, HostBinding, inject, Input } from '@angular/core';
import { AbstractControl, ControlContainer, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appErrorMessageForm]',
  standalone: true,
})
export class ErrorMessageForm implements DoCheck {
  @Input() messages: Partial<Record<string, string>> = {};
  @Input() control?: AbstractControl | null = null;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly controlContainer = inject(ControlContainer, { optional: true });

  private readonly DEFAULT_MESSAGES: Record<string, string | ((errorContext: any) => string)> = {
    required: 'Este campo es obligatorio',
    pattern: 'Formato inválido',
    duplicated: (errorContext) => `Valor duplicado: ${errorContext.value}`,
    min: (errorContext) => `Valor mínimo: ${errorContext.min}`,
    max: (errorContext) => `Valor máximo: ${errorContext.max}`,
    minlength: (errorContext) => `Mínimo ${errorContext.requiredLength} caracteres`,
  };

  @HostBinding('textContent') errorText = '';

  ngDoCheck(): void {
    if (!this.control) {
      this.resolveControl();
    }
    this.errorText = this.generateErrorMessage();
  }

  private resolveControl(): void {
    const matFormField = this.element.nativeElement.closest('mat-form-field');
    const currentControlElement = matFormField?.querySelector(
      '[formControlName]',
    ) as HTMLElement | null;
    const controlName = currentControlElement?.getAttribute('formControlName');

    if (!controlName) return;

    this.control = this.controlContainer?.control?.get(controlName) ?? null;
  }

  private generateErrorMessage(): string {
    if (!this.control || !this.control.touched || !this.control.errors) return '';

    const errorKey = Object.keys(this.control.errors)[0];
    const errorValue = this.control.errors[errorKey];
    const template = this.messages[errorKey] ?? this.DEFAULT_MESSAGES[errorKey] ?? 'Campo inválido';
    return typeof template === 'function' ? template(errorValue) : template;
  }
}
