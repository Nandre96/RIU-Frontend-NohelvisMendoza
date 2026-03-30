import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading';

export function loadingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);
  loadingService.show();
  return next(request).pipe(finalize(() => loadingService.hide()));
}
