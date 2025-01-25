import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../../shared/material.module";
import {passwordMatchValidator} from "../../Validators/ValidatePasswordMatch.validator";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup=this.fb.group({});

  constructor(private fb: FormBuilder, private userService: UserService,private _snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl<string>('', [Validators.required]),
      newPassword: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)
      ]),
      confirmPassword: new FormControl<string>('', [Validators.required]),


    },{
      validators: passwordMatchValidator
    });

  }
  onSubmit() {
    if (this.changePasswordForm.valid) {
      // Handle form submission
      this.userService.changePassword(this.changePasswordForm.value).subscribe({
        next: response => {
          this.openSnackBar(response.message, 'zamknij');
        },
        error: err=>{
          this.openSnackBar(err.message, 'zamknij');
        }
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
