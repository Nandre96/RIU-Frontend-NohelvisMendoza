import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, Subject, takeUntil, tap } from 'rxjs';
import { NotificationEvent } from '../../models/interfaces/notification.interface';
import { NotificationEventBus } from '../../services/notification-event-bus';

@Component({
  selector: 'app-snackbar-notifier',
  imports: [],
  template: '',
})
export class SnackBarNotifier {
  private snackBar = inject(MatSnackBar);
  private notificationBus = inject(NotificationEventBus);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.listenAnyNotification().subscribe({});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenAnyNotification() {
    return this.notificationBus.onEvent().pipe(
      takeUntil(this.destroy$),
      exhaustMap((event: NotificationEvent) => {
        return this.showSnackBar(event);
      }),
    );
  }

  private showSnackBar(event: NotificationEvent) {
    return this.snackBar
      .open(event.message, 'Cerrar', {
        duration: event.duration || 3000,
      })
      .afterDismissed()
      .pipe(takeUntil(this.destroy$));
  }
}
