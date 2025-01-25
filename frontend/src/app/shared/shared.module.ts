import {NgModule} from "@angular/core";
import {DatesFromToComponent} from "./dates-from-to/dates-from-to.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ErrorDialogComponent} from "./error-dialog/error-dialog.component";
import {MultiSelectComponent} from "./multi-select/multi-select.component";
import {SingleDateComponent} from "./single-date/single-date.component";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {TableComponent} from "./table/table.component";
import {HeaderComponent} from "../header/header.component";

@NgModule({
  declarations: [],
  imports: [
    DatesFromToComponent,
    ReactiveFormsModule,
    ErrorDialogComponent,
    MultiSelectComponent,
    SingleDateComponent,
    MaterialModule,
    CommonModule,
    HeaderComponent,
  ],
  exports: [
    DatesFromToComponent,
    ReactiveFormsModule,
    ErrorDialogComponent,
    MultiSelectComponent,
    SingleDateComponent,
    MaterialModule,
    CommonModule,
    HeaderComponent,
  ],

})
export class SharedModule {
}
