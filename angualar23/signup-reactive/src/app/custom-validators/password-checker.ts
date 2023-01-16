import {FormGroup} from "@angular/forms";


export function passwordchecker (
  controlname:string,
  comparecontrolname:string
  ){
    return (FormGroup:FormGroup) => {
      const password = FormGroup.controls[controlname];
      const confpassword = FormGroup.controls [comparecontrolname];

      if(password.value !== confpassword.value){
         confpassword.setErrors({mustmatch: true})
      } else{
        confpassword.setErrors(null);

      }
    }
  }
