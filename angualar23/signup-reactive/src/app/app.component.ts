import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators} from "@angular/forms";
import { passwordchecker } from './custom-validators/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'signup-reactive';
  'registerform': FormGroup;
  'submited': false;
  constructor(private formbuilder: FormBuilder){}

ngOnInit(): void {
  this.registerform = this.formbuilder.group({
    firstname : ["", Validators.required],
    lastname: ["",Validators.required],
    email: ["",[ Validators.required, Validators.email,]],
    password:["",[Validators.required, Validators.minLength(6)]],
    confirmpassword: ["", Validators.required],
    acceptedtandc: [false, Validators.requiredTrue],
  }, {
    Validators: passwordchecker('password', 'confirmpassword')
  });
}
  get h(){
    return this.registerform.controls;
  }
 onsubmit(){
   this.submited = false;
   if(this.registerform.invalid){
     return;
   }
    console.table(this.registerform.value);
    console.table(this.registerform);

    alert("sucess signup\n"+ JSON.stringify(this.registerform.value));
 }

onreset(){
  this.submited = false;
  this.registerform.reset();
}
}
