import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {SharedModule} from "../../shared/shared.module";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MaterialModule,SharedModule,    RouterLink,
    RouterLinkActive,],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
