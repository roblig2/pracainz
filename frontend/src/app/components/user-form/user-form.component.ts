import {AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../models/user";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HeaderComponent} from "../../header/header.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleEnum} from "../../models/role.enum";
import {tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [SharedModule, TranslateModule, HeaderComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit,AfterViewInit{
  header!: string;
  userForm: FormGroup = this.fb.group({});
  selectRoles = Object.values(RoleEnum);
  isEdit = false;

  constructor(private fb: FormBuilder, private userService: UserService, public dialog: MatDialog,private _snackBar: MatSnackBar,private activatedRoute: ActivatedRoute,public translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.get("create.user").subscribe(value => this.header = value);
    this.userForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      username: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', this.isEdit ? [] : [Validators.required, Validators.maxLength(120)]],
      isDriver: [false, Validators.required],
      availableDates: this.fb.array([]),
      roles: [[RoleEnum.USER], Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9. ()-]{9,9}$')]],
      editPassword: [!this.isEdit],

    });

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadUser(id);
      }
    });


  }

  ngAfterViewInit() {
    this.userForm.controls['editPassword']?.valueChanges.subscribe(value => {
      this.updateValidators(value)
    })
    this.toggleChangePassword();
  }
  updateValidators(value:boolean) {
    const passwordControl = this.userForm.controls['password'];
    if (value) {
      passwordControl?.setValidators([Validators.required]);
      if (typeof passwordControl?.value!== 'string' || passwordControl?.value == "" || passwordControl?.value == null) {
        passwordControl?.patchValue('');
      }
    } else {
      passwordControl?.clearValidators();
    }
    passwordControl?.updateValueAndValidity();

  }
  loadUser(id: string): void {
    this.userService.getUserById(id).subscribe(user => {
      this.isEdit = true;
      this.translate.get("edit.user").subscribe(value => this.header = value +`: ${user.firstName} ${user.lastName}`)

      this.userForm.patchValue({
        firstName: user.firstName,
        lastName:user.lastName,
        username: user.username,
        isDriver: user.isDriver,
        dateOfBirth: user.dateOfBirth,
        roles: user.definedRoles?.map(value => value.name),
        phoneNumber: user.phoneNumber,
        editPassword: [false],
      });
      // this.loadAvailableUsers(this.eventForm.controls['date']?.value);
      // this.eventForm.controls['date']?.updateValueAndValidity();
    });
  }
  generateRandomPassword(): void {
    const randomPassword = Math.random().toString(36).slice(-8);
    this.userForm.patchValue({ password: randomPassword });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEdit) {
        this.editUser();
      } else {
        this.createUser();
      }
    }
  }

  editUser(){
    //todo
    this.userService.editUser(this.userForm.value).subscribe({
      next: response => {
        this.openSnackBar('Użytkownik zaktualizowany', 'zamknij');
      },
      error: () => {
        this.openSnackBar('Wystąpił problem z aktualizacją użytkownika', 'zamknij');
      }
    });
  }

  private createUser() {
    const user: User = this.userForm.value;
    this.userService.createUser(user).subscribe({
      next: response => {
        this.openSnackBar('Użytkownik utworzony', 'zamknij');
      },
      error: () => {
        this.openSnackBar('Użytkownik z takim adresem email istnieje', 'zamknij');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  getRoleName(role: string): string {
    switch (role) {
      case RoleEnum.ADMIN:
        return 'Admin';
      case RoleEnum.USER:
        return 'Użytkownik';
      default:
        return role;
    }
  }

  toggleChangePassword() {
      if (this.userForm.get('editPassword')?.value === true) {
        this.userForm.get('password')?.enable();
      } else {
        this.userForm.get('password')?.disable();
      }
    }

  getMinimumDate() :Date{
    return new Date(new Date().setFullYear(1900,0,1));
  }
}
