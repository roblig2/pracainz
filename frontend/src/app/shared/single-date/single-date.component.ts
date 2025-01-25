import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {MaterialModule} from "../material.module";
import {CommonModule} from "@angular/common";
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-single-date',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  viewProviders:[
    {
      provide:ControlContainer,
      useFactory: ()=>inject(ControlContainer,{skipSelf:true})
    }
  ],
  templateUrl: './single-date.component.html',
  styleUrl: './single-date.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleDateComponent implements OnInit,OnChanges,AfterViewInit{
  // form: FormGroup = this.fb.group({});
  parentContainer = inject(ControlContainer)

  get parentFormGroup(){
    return this.parentContainer.control as FormGroup;
  }
  @Input()
  minDate: Date = new Date();
  dateFormat: string = 'DD.MM.YYYY';
  @Input()
  label?: string
  @Input()
  controlName:string = 'date';
  @Input()
  isRequired = false;
  @Output()
  changeEventDate= new EventEmitter;
  @Input()
  disabled = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(){
    this.parentFormGroup.addControl(this.controlName,new FormControl({date: ['', this.isRequired ? [Validators.required] : []]}));


  }
  ngAfterViewInit(){
    this.updateValidators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRequired']) {
      this.updateValidators();
    }
    if (changes['disabled']) {
      this.updateDisabledState();
    }
  }

  updateDisabledState(): void {
    const control = this.parentFormGroup.get(this.controlName);
    if (this.disabled) {
      control?.disable();
    } else {
      control?.enable();
    }
  }
  updateValidators() {
    this.isRequired = !this.isRequired;
    const dateControl = this.parentFormGroup.get(this.controlName);

    if (this.isRequired) {
      dateControl?.setValidators([Validators.required]);
      if (typeof dateControl?.value!== 'string' || dateControl?.value == "" || dateControl?.value == null) {
        dateControl?.patchValue('');
      }
    } else {
      dateControl?.clearValidators();
    }
    dateControl?.updateValueAndValidity();

  }

  changeDate(event: MatDatepickerInputEvent<any, any>) {
    if(!this.disabled){
      this.changeEventDate.emit(event)
    }
  }
}
