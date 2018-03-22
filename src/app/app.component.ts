import { Component, OnInit } from '@angular/core';
import { GallaryService } from  './gallary.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeUsers:String[];
  inactiveUsers:String[];
  gallaryimage:object;
  constructor(private gallaryservice:GallaryService){
    
  }
  ngOnInit() {
    this.gallaryimage=this.gallaryservice.images;
  }
}
