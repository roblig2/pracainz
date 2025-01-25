import {Component, inject, OnInit, signal} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {AsyncPipe, NgIf} from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {JwtService} from "../services/jwt.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {RoleEnum} from "../models/role.enum";

@Component({
  selector: 'app-header-main',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NgIf,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ]
})
export class HeaderComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isAdmin = signal<string>('');

  constructor(private router:Router,private jwtService:JwtService,private _snackBar: MatSnackBar,private translate:TranslateService) {

  }

  ngOnInit() {
    let roles = this.jwtService.getRoles();

    if (roles.length > 0 && this.jwtService.isLoggedIn()) {
      if (roles.includes(RoleEnum.ADMIN)) {
        this.isAdmin.set(RoleEnum.ADMIN);
      } else {
        this.isAdmin.set(RoleEnum.USER);
      }
    }
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

  protected readonly RoleEnum = RoleEnum;
}
