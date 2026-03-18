import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { filter, tap } from 'rxjs';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { SuperHeroView } from '../../models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from '../../services/super-hero-view';
@Component({
  selector: 'app-super-heroe-item',
  imports: [MatCardModule, MatTooltipModule, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './super-heroe-item.html',
  styleUrl: './super-heroe-item.css',
})
export class SuperHeroeItem {
  superHeroe = input.required<SuperHeroView>();
  readonly superHeroesViewService = inject(SuperHeroViewService);
  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  onEdit(superHeroe: SuperHeroView): void {
    this.superHeroesViewService.selectHero(superHeroe.id);
    this.router.navigate(['/heroes', superHeroe.id, 'edit']);
  }

  onDelete(superHeroe: SuperHeroView): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: superHeroe,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result === true),
        tap(() => {
          this.superHeroesViewService.deleteHero(superHeroe.id);
          this.router.navigate(['/heroes']);
        }),
      )
      .subscribe({});
  }
}
