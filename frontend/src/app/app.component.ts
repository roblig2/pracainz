import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {EventFormComponent} from "./eventform/event-form.component";
import {WorkdayFormComponent} from "./components/workday-form/workday-form.component";
import {EventListComponent} from "./components/event-list/event-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TableComponent} from "./shared/table/table.component";
import {HeaderComponent} from "./header/header.component";
import {JwtService} from "./services/jwt.service";
import {Observable, of, tap} from "rxjs";
import {CommonModule, Location} from "@angular/common";
import {CustomDateAdapter} from "./shared/custom-date-adapter";
import {DateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventFormComponent, WorkdayFormComponent, EventListComponent, HeaderComponent, TranslateModule, TableComponent, HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit,AfterViewInit{

  isLoggedIn = signal<boolean>(true);
  isLoggedIn$: Observable<boolean> = of(false);
  constructor(
    public translate: TranslateService,
    private jwtService: JwtService,
    private router: Router,
    private location:Location,
    private dateAdapter: DateAdapter<Date>
  ) {
  }


  ngOnInit() {
    this.translate.use('pl');
    this.dateAdapter.setLocale('pl');
  }
  ngAfterViewInit(){
    this.isLoggedIn$ = this.jwtService.isLoggedInContinuesCheck();
    this.isLoggedIn$.pipe(
      tap((isLoggedIn: boolean) => this.isLoggedIn.set(isLoggedIn))
    ).subscribe();
  }
}
