import {FormControl, Validators} from "@angular/forms";

export interface Password{
  currentPassword:string;
  newPassword:string;
  confirmPassword:string;
}
