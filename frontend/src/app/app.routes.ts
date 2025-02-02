import {Routes} from '@angular/router';
import {EventFormComponent} from "./eventform/event-form.component";
import {EventListComponent} from "./components/event-list/event-list.component";
import {WorkdayFormComponent} from "./components/workday-form/workday-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {AdminAuthGuard} from "./shared/guard/admin-auth-guard";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {
  UserAvailabilityListComponent
} from "./components/availability/user-availability-list/user-availability-list.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {UserAuthGuard} from "./shared/guard/user-auth-guard";
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MyEventsComponent} from "./components/my-events/my-events.component";

export const routes: Routes = [
  {
    path: 'createEvent',
    loadComponent: () => EventFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'eventList',
    loadComponent: () => EventListComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'userList',
    loadComponent: () => UserListComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'availabilityList',
    loadComponent: () => UserAvailabilityListComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'home',
    loadComponent: () => WorkdayFormComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => LoginFormComponent
  },
  {
    path: 'changePassword',
    loadComponent: () => ChangePasswordComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'createUser',
    loadComponent: () => UserFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'eventDetails/:id',
    loadComponent: () => EventDetailsComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'userDetails/:id',
    loadComponent: () => UserDetailsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'editUser/:id',
    loadComponent: () => UserFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'editEvent/:id',
    loadComponent: () => EventFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'myEvents',
    loadComponent: () => MyEventsComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'not-found',
    loadComponent: () => NotFoundComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },
];
