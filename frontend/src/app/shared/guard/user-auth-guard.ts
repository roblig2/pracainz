import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {JwtService} from "../../services/jwt.service";
import {Injectable} from "@angular/core";

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private jwtService:JwtService,private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    if (!this.jwtService.isLoggedIn()) {
      return this.router.navigate(["/login"]);
    }else if(!this.jwtService.isUser()){
      return this.router.navigate(["/"])
    }
    return true;
  }

}
