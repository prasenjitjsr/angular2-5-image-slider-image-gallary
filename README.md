# Angular 2/5 Image-slider or image-gallary

Angular Image slider used Angular-CLI.
I have created a gallary directive which accept some gallary configuration via attribute.

You can just add directive file in your project and use the below code in Template file:

.html file:
--------------
```
<div class="row">
      <div class="gallary-wrap" gallarySlide="item" gallaryBoxID="items" 
      item-md=4 item-sm=2 item-xs=1>
          <div class="items" id="items">
            <div *ngFor="let image of gallaryimage" class="item">
                <a href="https://www.onwebg.com/" target="_blank">
                <img src="assets/images/{{image.image}}" alt="{{ image.title }}">
              </a>
            </div>
          </div>
          <div class="slider-controller">
            <button class="prevbtn slideBtn">Prev</button>
            <button class="nextbtn slideBtn">next</button>
          </div>
      </div>
  </div>
```

.ts file
--------
```
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
```
.css file
------------------
use gallary css using Flex-layout (Css code in app.component.css)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
