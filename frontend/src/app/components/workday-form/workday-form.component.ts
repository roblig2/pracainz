import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WorkdayService} from "../../services/workday.service";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../shared/material.module";
import {DatesFromToComponent} from "../../shared/dates-from-to/dates-from-to.component";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {SingleDateComponent} from "../../shared/single-date/single-date.component";
import {HeaderComponent} from "../../header/header.component";
import {format} from "date-fns";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../services/event.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-workday-form',
  templateUrl: './workday-form.component.html',
  standalone: true,
	imports: [
		MaterialModule,
		ReactiveFormsModule,
		CommonModule,
		SharedModule,
		DatesFromToComponent,
		HeaderComponent,
		TranslateModule,
		SingleDateComponent,
		HeaderComponent,
	],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './workday-form.component.css'
})
export class WorkdayFormComponent implements OnInit,AfterViewInit {
  workdayForm: FormGroup = this.fb.group({});
  maxDate: Date = new Date();


  constructor(private fb: FormBuilder, private workdayService: WorkdayService,
              private userService: UserService,
              private route: ActivatedRoute,
              private eventService: EventService,
              private cdr: ChangeDetectorRef,
              private _snackBar: MatSnackBar) {

    this.maxDate.setDate(this.maxDate.getDate() + 14)
  }

  ngOnInit(): void {
    this.workdayForm = this.fb.group({
      hasRemarks: false,
      remark: [{ value: '', disabled: true }, [Validators.maxLength(100)]]
    });

    this.workdayForm.get('hasRemarks')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.workdayForm.get('remark')?.enable();
      } else {
        this.workdayForm.get('remark')?.disable();
        this.workdayForm.get('remark')?.setValue('');
      }
    });
  }
  // addDateRangeControl(): void {
  //   const dateRangeGroup = this.fb.group({});
  //   this.formService.addControl(this.workdayForm, 'calendarFrom', []);
  //   this.workdayForm.setControl('calendarFrom', dateRangeGroup);
  // }
  toggleRemarks(): void {
    const hasRemarks = this.workdayForm.get('hasRemarks')?.value;
    if (hasRemarks) {
      this.workdayForm.get('remark')?.enable();
    } else {
      this.workdayForm.get('remark')?.disable();
      this.workdayForm.get('remark')?.setValue('');
    }
  }
  isSubmitDisabled(): boolean {
    const hasRemarks = this.workdayForm.get('hasRemarks')?.value;
    const remark = this.workdayForm.get('remark')?.value;
    return hasRemarks && !remark;
  }
  ngAfterViewInit(): void {
    // this.workdayForm = this.fb.group({
    //   calendarForm:['',Validators.required],
    //   calendarTo: ['', Validators.required],
    //
    // } );
  }

  onSubmit(): void {
    if (this.workdayForm.get('hasRemarks')?.value === true) {
      this.workdayForm.removeControl('twoCalendars')
    }else{
      this.workdayForm.removeControl('dateFrom')
    }
    if (this.workdayForm.valid) {
      const formValue = this.workdayForm.value;
      const formData = { ...this.workdayForm.value };
      if (formData.hasRemarks) {
        delete formData.hasRemarks;
      }
      this.workdayService.addWorkdays(formValue).subscribe(event => {
        this.workdayForm.reset({
          hasRemarks: false,
          remark: '',
        });
        Object.keys(this.workdayForm.controls).forEach(key => {
          this.workdayForm.get(key)?.setErrors(null);
        });
        this.openSnackBar('Dodana chęć do pracy', 'zamknij');
      });
    }
    }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
