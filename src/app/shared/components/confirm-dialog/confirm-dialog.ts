import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SuperHeroView } from '../../../heroes/models/interfaces/view/super-hero.view.interface';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  hero: SuperHeroView = inject(MAT_DIALOG_DATA);
}
