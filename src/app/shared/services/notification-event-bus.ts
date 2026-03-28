import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationEvent } from '../models/interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationEventBus {
  private notificationSubject = new Subject<NotificationEvent>();

  notify(event: NotificationEvent) {
    this.notificationSubject.next(event);
  }

  onEvent(): Observable<NotificationEvent> {
    return this.notificationSubject.asObservable();
  }
}
