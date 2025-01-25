import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-dates-from-to',
  standalone: true,
  imports: [

    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    // CommonModule
  ],
  viewProviders:[
    {
      provide:ControlContainer,
      useFactory: ()=>inject(ControlContainer,{skipSelf:true})
    }
  ],
  templateUrl: './dates-from-to.component.html',
  styleUrl: './dates-from-to.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesFromToComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  parentContainer = inject(ControlContainer)

  get parentFormGroup(){
    return this.parentContainer.control as FormGroup;
  }

  @Input() controls: { name: string, type: string, label: string }[] = [];
  @Input()
  suppressDates = false;
  @Input()
  isRequired = false;
  maxDate: Date = new Date();
  minDate: Date = new Date();
  dateFormat: string = 'DD.MM.YYYY';

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(){
   this.form = new FormGroup({
    calendarFrom: new FormControl('', this.isRequired ? [Validators.required] : []),
    calendarTo: new FormControl('', this.isRequired ? [Validators.required] : [])
  },);
    this.parentFormGroup.addControl('twoCalendars', this.form);
    // this.parentFormGroup.addControl('calendarFrom',new FormControl('', this.isRequired ? [Validators.required,ValidateDateToValidator] : ValidateDateToValidator))
    // this.parentFormGroup.addControl('calendarTo', new FormControl('', this.isRequired ? [Validators.required,ValidateDateToValidator] : ValidateDateToValidator))
    this.maxDate.setDate(this.maxDate.getDate() + 21);
    // this.dateForm = this.fb.group({
    //   calendarFrom: ['', this.isRequired ? Validators.required : null],
    //   calendarTo: ['', this.isRequired ? Validators.required : null],
    // }, {validator: ValidateDateToValidator});
    // this.maxDate.setDate(this.maxDate.getDate() + 14)
  }

  getMinDate() {
    return this.suppressDates ? this.minDate : null;
  }
  getMaxDate() {
    return this.suppressDates ? this.maxDate : null;
  }

  updateDate(event: MatDatepickerInputEvent<any, any>) {
    if(this.form.get('calendarTo')?.value === null || this.form.get('calendarTo')?.value<this.form.get('calendarFrom')?.value){
      this.form.get('calendarTo')?.patchValue(this.form.get('calendarFrom')?.value ?? event.value);
      this.form.updateValueAndValidity();
      this.cdr.detectChanges();

    }
  }

  getErrorMessage() {
    return "Pole jest wymagane";
  }

  shouldPresentError(calendarFrom: string) {
    return this.form && this.form.get(calendarFrom)?.touched && this.form.get(calendarFrom)?.getError("required") === true
  }
}
