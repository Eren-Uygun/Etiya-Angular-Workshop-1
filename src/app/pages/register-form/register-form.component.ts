import { Component,OnInit } from '@angular/core';
import  {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
}from '@angular/forms';

@Component({
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit{
  firstName:string = '';
  lastName:string = '';
  email:string = '';
  password:string = '';
  confirmPassword = '';


  addForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) {}
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.addForm = this.formBuilder.group({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
    });
  }

  hasValidationError(controlName: string, errorType: string){
    if(this.addForm.controls[controlName].touched && 
      this.addForm.controls[controlName].errors != null && 
      this.addForm.controls[controlName].getError(errorType) != null)
      {
        return true;
      }
      return false;
  }

  submitForm(){
    this.addForm.markAllAsTouched();
    if(this.addForm.invalid){
      console.log("Validasyon hatası "+this.addForm.errors);
      return;
    }
    if(this.password.match(this.confirmPassword)){
      console.log("Şifreler Aynı olmalıdır.");
      return;
    }
    let req = this.addForm.value;
    console.log(req);
  }

}
