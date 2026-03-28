import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { SnackBarNotifier } from './shared/components/snackbar-notifier/snackbar-notifier';
import { LoadingService } from './shared/services/loading';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatDividerModule,
    RouterLinkWithHref,
    RouterModule,
    MatToolbarModule,
    SnackBarNotifier,
    MatProgressSpinner,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  loadingService = inject(LoadingService);
  isLoading = toSignal(this.loadingService.loading$);
  protected readonly title = signal('Super Heroes');
}
