import { Router} from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email= any= null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    auth.getuser().subscribe((user) =>{
           console.log("user is:",user)
          this.email = user?.email;
    });
   }

  ngOnInit(): void {
  }
  async handlesignout(){
    try{
         await this.auth.signout();
         this.router.navigateByUrl("/signin")
         this.toastr.info("logout success")
         this.email = null
    }catch (error){
      this.toastr.error("problem in signout")
    }
  }

}
