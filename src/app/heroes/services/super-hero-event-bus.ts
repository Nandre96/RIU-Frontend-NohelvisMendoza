import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { EventBusActionType } from '../../shared/models/types/event-bus-action.type';
import { SuperHeroView } from '../models/interfaces/view/super-hero.view.interface';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../models/types/request/update-super-heroe.request.type';
import { SuperHeroViewService } from './super-hero-view';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroEventBus {
  readonly superHeroesViewService = inject(SuperHeroViewService);
  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  onAction(
    action: EventBusActionType,
    superHero: SuperHeroView | UpdateSuperHeroRequest | CreateSuperHeroRequest,
  ): void {
    const actionHandlers: Record<EventBusActionType, () => void> = {
      CREATE: () => {
        this.superHeroesViewService.createHero(superHero as CreateSuperHeroRequest);
        this.router.navigate(['/heroes']);
      },
      UPDATE: () => {
        this.superHeroesViewService.updateHero(superHero as UpdateSuperHeroRequest);
        this.router.navigate(['/heroes']);
      },
      EDIT_MODE: () => {
        const superHeroView = superHero as SuperHeroView;
        this.superHeroesViewService.selectHero(superHeroView.id);
        this.router.navigate(['/heroes', superHeroView.id, 'edit']);
      },
      DELETE: () => {
        const dialogRef = this.dialog.open(ConfirmDialog, { data: superHero });
        dialogRef
          .afterClosed()
          .pipe(
            filter((result) => result === true),
            tap(() => {
              const superHeroView = superHero as SuperHeroView;
              this.superHeroesViewService.deleteHero(superHeroView.id);
              this.router.navigate(['/heroes']);
            }),
          )
          .subscribe();
      },
    };

    actionHandlers[action]?.();
  }
}
