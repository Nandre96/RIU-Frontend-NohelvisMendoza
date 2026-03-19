import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { EventBusActionType } from '../../shared/models/types/event-bus-action.type';
import { SuperHeroView } from '../models/interfaces/view/super-hero.view.interface';
import { SuperHeroViewService } from './super-hero-view';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroEventBus {
  readonly superHeroesViewService = inject(SuperHeroViewService);
  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  onAction(action: EventBusActionType, superHero: SuperHeroView): void {
    const actionHandlers: Record<EventBusActionType, () => void> = {
      EDIT: () => {
        this.superHeroesViewService.selectHero(superHero.id);
        this.router.navigate(['/heroes', superHero.id, 'edit']);
      },
      DELETE: () => {
        const dialogRef = this.dialog.open(ConfirmDialog, { data: superHero });
        dialogRef
          .afterClosed()
          .pipe(
            filter((result) => result === true),
            tap(() => {
              this.superHeroesViewService.deleteHero(superHero.id);
              this.router.navigate(['/heroes']);
            }),
          )
          .subscribe();
      },
    };

    actionHandlers[action]?.();
  }
}
