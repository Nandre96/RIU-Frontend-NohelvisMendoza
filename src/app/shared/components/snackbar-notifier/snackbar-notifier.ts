import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap } from 'rxjs';
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

  ngOnInit() {
    this.listenAnyNotification().subscribe();
  }

  private listenAnyNotification() {
    return this.notificationBus.onEvent().pipe(
      exhaustMap((event: NotificationEvent) => {
        return this.showSnackBar(event);
      }),
    );
  }

  private showSnackBar(event: NotificationEvent) {
    return this.snackBar
      .open(event.message, event.action || 'Cerrar', {
        duration: event.duration || 1500,
        ...(event.horizontalPosition && { horizontalPosition: event.horizontalPosition }),
        ...(event.verticalPosition && { verticalPosition: event.verticalPosition }),
      })
      .afterDismissed();
  }
}
