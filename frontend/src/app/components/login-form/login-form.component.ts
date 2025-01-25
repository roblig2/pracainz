import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {LoginService} from "../../services/login.service";
import {JwtService} from "../../services/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit{
  formGroup!:FormGroup;
  loginError = signal<boolean>(false);
  constructor(private formBuilder:FormBuilder,private loginService:LoginService,private jwtService:JwtService,private router:Router) {
  }
  ngOnInit(){
    if(this.jwtService.isLoggedIn()){
      this.router.navigate(["/"])
    }
    this.formGroup = this.formBuilder.group({
      username:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  submit(){
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value)
        .subscribe({
          next:(response)=>{
            this.loginError.set(false);
            this.jwtService.setToken(response.token);
            this.router.navigate(["/"])
          },
          error: ()=>{
            this.loginError.set(true);
          }
        });
    }
  }
}
