import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// broweser image resizer
import {readAndCompressImage} from 'browser-image-resizer';
import { imageconfig } from 'src/utils/config';
//uuid
import {v4 as uuidv4} from "uuid"

@Component({
  selector: 'app-adpost',
  templateUrl: './adpost.component.html',
  styleUrls: ['./adpost.component.css']
})
export class AdpostComponent implements OnInit {
  locationname: string;
  description: string;
  picture: string= null;
  user = null;
  uploadpercent: number = null;


  constructor(
    private db : AngularFireDatabase,
    private stroage: AngularFireStorage,
    private toastr: ToastrService,
    auth: AuthService,
    private router: Router

  ) {
    auth.getuser().subscribe((user)=>{
      this.db.object(`/users${user?.uid}`)
      .valueChanges()
      .subscribe((user) =>{
        this.user = user;
      })
    })
   }

  ngOnInit(): void {
  }
  onsubmit(){
    const uid = uuidv4()
    this.db.object(`/posts/${uid}`)
    .set({
      id:uid,
      locationname: this.locationname,
      description: this.description,
      picture: this.picture,
      by: this.user.name,
      instaid:this.user.instausername,
      date: Date.now()
    })
    .then(()=>{
      this.toastr.success("post added succesfully")

      this.router.navigateByUrl("/")
    })
    .catch((err)=>{
      this.toastr.error("oopss")
    })
  }
   async uploadfile(event){
     const file = event.target.files[0];
     let resizedimage = await readAndCompressImage(file, imageconfig)
     const filepath: File.name,
     const fileref: this.storage.ref(filepath)
     const task = this.stroage.upload(filepath, resizedimage)
     task.percentageChanges().subscribe((percentage)=>{
       this.uploadpercent = percentage
     })
     task.snapshotChanges().pipe(
       finalize(()=>{
         fileref.getdownloadurl().subscribe((url)=>{
           this.picture = url;
           this.toastr.success("image upload success")
         })
       })
     ).subscribe()



   }


}
