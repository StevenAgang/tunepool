import { HttpInterceptorFn } from '@angular/common/http';
import { Environment } from '../../environment/environment';

export const Interceptor: HttpInterceptorFn = (req, next) => {
  const header = req.clone({
    setHeaders: {
      Handshake: Environment.identity,
    },
  });

  return next(header);
};
