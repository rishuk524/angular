import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = []
  posts =[];

  isloading = false;

  constructor(
    private db: AngularFireDatabase,
    private toastr : ToastrService,
  ) {
    this.isloading = true;
    //get all users
    db.object('/users')
    .valueChanges()
    .subscribe((Obj)=>{
      if(obj){
        this.users = object.values(obj)
        this.isloading =  false
      } else {
        toastr.error("no user found")
        this.users = [];
        this.isloading = false;
      }
    });
    //grab all post from firebase
    db.object('/posts')
    .valueChanges()
    .subscribe((obj)=>{
      if(obj){
        this.post = object.values(obj).sort((a,b)=>b.date-a.date)
        this.isloading = false
      } else{
        toastr.error("no post to display")
        this.isloading = false
      }
    })
  }

  ngOnInit(): void {
  }

}
