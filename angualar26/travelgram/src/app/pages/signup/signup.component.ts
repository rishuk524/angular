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
imageconfig
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  picture :string =
  "https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/image/logo_lco_i3oab.png"
   uploadpercent: number = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  onsubmit(f: NgForm){
    const {email, password, username, country, bio, name} = f.form.value;
    //futrher sanitazation do here
    this.auth.signup(email, password)
    .then((res) => {
       console.log(res);
       const {uid} = res.user
       this.db.object(`/users/${uid}`)
       .set({
         id:uid,
         name: name,
         email: email,
         instausername: username,
         country: country,
         bio: bio,
         picture:this.picture
       })
    })
    .then(()=>{
      this.router.navigateByUrl('/');
      this.toastr.success("signup sucess")
    })
    .catch((err)=>{
      this.toastr.error("signup failed")
    });
  }
 async  upoloadfile(event){
   const file = event.target.files[0];
   let resizedimage =  await readAndCompressImage(file, imageconfig)
   const filepath = file.name//renamed the image with todouuid
   const fileref = this.storage.ref(filepath)
   const task = this.storage.upload(filepath, resizedimage)
   task.percentageChanges().subscribe((percentage)=>{
     this.uploadpercent= percentage
   });
   task.snapshotChanges()
   .pipe(
     finalize(()=>{
       fileref.getDownloadURL().subscribe((url)=>{
         this.picture = url;
         this.toastr.success('image upload success')
       })
     })
   )
   .subscribe()


  }

}
