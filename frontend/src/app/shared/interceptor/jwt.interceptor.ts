import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {JwtService} from "../../services/jwt.service";
import {inject} from "@angular/core";

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const jwtService = inject(JwtService);
  const token = jwtService.getToken();

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
  }



  return next(req);
};
