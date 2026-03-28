import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY, filter, Observable, of, switchMap } from 'rxjs';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { SuperHeroView } from '../models/interfaces/view/super-hero.view.interface';
import { CreateSuperHeroRequest } from '../models/types/request/create-super-heroe.request.type';
import { UpdateSuperHeroRequest } from '../models/types/request/update-super-heroe.request.type';
import { SuperHeroActionType, SuperHeroEventAction } from '../models/types/super-hero-action.type';
import { SuperHeroViewService } from './super-hero-view';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroActionService {
  readonly superHeroesViewService = inject(SuperHeroViewService);
  readonly dialog = inject(MatDialog);

  onAction(action: SuperHeroEventAction): Observable<SuperHeroView | boolean> {
    const { type, payload } = action;
    const actionHandlers: Record<SuperHeroActionType, () => Observable<SuperHeroView | boolean>> = {
      CREATE: () => {
        return this.superHeroesViewService.createHero(payload as CreateSuperHeroRequest);
      },
      UPDATE: () => {
        return this.superHeroesViewService.updateHero(payload as UpdateSuperHeroRequest);
      },
      EDIT_MODE: () => {
        const superHeroView = payload as SuperHeroView;
        this.superHeroesViewService.selectHero(superHeroView.id);
        return of(superHeroView);
      },
      DELETE: () => {
        const dialogRef = this.dialog.open(ConfirmDialog, { data: payload });
        return dialogRef.afterClosed().pipe(
          filter((result) => result),
          switchMap(() => {
            const superHeroView = payload as SuperHeroView;
            return this.superHeroesViewService.deleteHero(superHeroView.id);
          }),
        );
      },
    };

    return actionHandlers[type]?.();
  }
}
