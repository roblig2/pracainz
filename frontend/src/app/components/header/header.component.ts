import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {JwtService} from "../../services/jwt.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header-2',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private router:Router,private jwtService:JwtService,private _snackBar: MatSnackBar,private translate:TranslateService) {
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    let isLoggedOut = this.jwtService.logout();
    this.translate.get("logout").subscribe(message => {
      this.router.navigate(["/login"]).then(r => this._snackBar.open( message,"zamknij",{
        duration: 1000,
        verticalPosition: 'top'
      }) )
    })

  }
}
