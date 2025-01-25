import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtService} from "../../services/jwt.service";
import {User} from "../../models/user";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ResponseMessage} from "../../models/response-message";
import {NOT_FOUND} from "../../models/constants";



@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  private user!: User;
  userForm!:FormGroup
  showActionIcons = false;
  constructor(private route: Router,private fb: FormBuilder,private jwtService:JwtService,private activatedRoute: ActivatedRoute,private userService:UserService,private _snackBar: MatSnackBar,private dialog: MatDialog) { }


  ngOnInit(): void {
    this.showActionIcons = this.jwtService.isAdmin();

    this.userForm = this.fb.group({
      id: [{value: '', disabled: true}],
      name: [{value: '', disabled: true}],
      mail: [{value: '', disabled: true}],
      phoneNumber: [{value: '', disabled: true}],
      driver: [{value: '', disabled: true}],
    });
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadUser(id);
      }
    });


  }
  getDriverInput(driver: boolean) {
    return driver ? "Kierowca" : "Użytkownik"
  }
  loadUser(id: string): void {
    this.userService.getUserById(id).subscribe({
      next:user => {
      this.userForm.patchValue({
        id: user.id,
        name: user?.firstName ? user?.firstName + ' ' + user?.lastName : "Bambik",
        lastName: user.lastName,
        mail: user.username,
        driver: this.getDriverInput(user.isDriver),
        phoneNumber: user.phoneNumber
      })
      },
      error: ()=>{
        this.route.navigate([NOT_FOUND])
      }
    })
  }

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action,{
    duration: 3000,
    verticalPosition: 'top'
  });
}
  get assignedUserIds(): FormArray {
    return this.userForm.get('assignedUserIds') as FormArray;
  }

  get blackListedUsers(): FormArray {
    return this.userForm.get('blackListedUsers') as FormArray;
  }

  get confirmedUsers(): FormArray {
    return this.userForm.get('confirmedUsers') as FormArray;
  }
  onEdit() {
    this.route.navigate(['/editUser/'+this.userForm.get('id')?.value])
  }

  onDelete() {
    this.dialog.open(ConfirmDialogComponent,{
      width: '500px',
      data: {message : `Czy chcesz usunąć użytkownika ${this.userForm.controls['name']?.value}`,header: "Usunięcie Użytkownika"}
    }).afterClosed().subscribe(closeData =>{
      if(closeData){
        this.userService.deleteUser(this.userForm.controls['id']?.value).subscribe({
          next: (value:ResponseMessage) => {
            this.openSnackBar(`usunięto Użytkownika ${value.message}`, 'zamknij');
            this.route.navigate(["/userList"])
          },
          error: () => this.openSnackBar("Coś poszło nie tak", 'zamknij')
        });
      }
    });
  }
}
