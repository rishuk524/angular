import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input,  OnChanges, SimpleChanges,} from '@angular/core';
import{
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons"
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
  @Input()
  post;
  faThumbsUp =faThumbsUp
  faThumbsDown =faThumbsDown
  faShareSquare= faShareSquare
  uid = null;

  upvote = 0
  downvote = 0



  constructor(private db: AngularFireDatabase,
    private auth: AuthService) {
      this.auth.getuser().subscribe((user)=>{
        this.uid = user?.uid
      })
    }

  ngOnInit(): void {
  }
  //todo : bug in updating the changes
  ngOnChanges(): void {
    if(this.post){
      Object.values(this.post.vote).map((val:any)=>{
        if(val.upvote){
        this.upvote +=1
        }
        if(val.downvote){
          this.downvote = +=1
        }
      })
    }
  }
  upvotepost(){
    console.log("upvoting")
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote : 1,
    })
  }
  downvotepost(){
    console.log("downvoting")
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote : 1,
    })
  }
  getinstaurl(){
    return `https://instagram.com/${this.post.instaid}`
  }

}
