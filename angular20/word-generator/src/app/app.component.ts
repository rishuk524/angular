import { Component } from '@angular/core';
import arraywords from '../utils/words';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'word-generator';


words = '';
limit  = 10;


handleslidechange(newlimit: number){
  this.limit = newlimit;
}
   generate (){
     this.words = arraywords.slice(0, this.limit).join(' ');
   }


}
