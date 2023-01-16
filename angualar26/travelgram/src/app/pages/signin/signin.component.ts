import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
Router

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  onsubmit(f: NgForm){
    const {email, password} = f.form.value;
    this.auth.signin(email, password)
    .then((err)=>{
     this.toastr.success("sigin sucess");
     this.router.navigateByUrl('/');
    })
    .catch((err)=> {
      this.toastr.error(err.message, '', {
        closeButton: true,
      });
    });

  }

}
