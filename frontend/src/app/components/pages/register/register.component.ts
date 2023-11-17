import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  isSubmitted  = false;
  returnUrl = '';

  constructor( private formBuilder: FormBuilder,
    private userservice:UserService,
    private activatedRouter: ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]] ,
      confirmPassword : ['',Validators.required ],
      address:['',Validators.required,Validators.minLength(10)]
    },
    {
      Validators:PasswordsMatchValidator('password','confirmPassword')
    });
    this.returnUrl = this.activatedRouter.snapshot.queryParams.returnUrl;
  }

  get fc()
  {
    return this.registerForm.controls
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    
    const fv = this.registerForm.value;
    const user : IUserRegister = {
      name :fv.name,
      email : fv.email,
      password : fv.password,
      confirmPassword:fv.confirmPassword,
      address:fv.address
    };
    this.userservice.register(user).subscribe(_=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
