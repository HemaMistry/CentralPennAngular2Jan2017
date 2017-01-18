import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoggingService]
})
export class HomeComponent implements OnInit {

  constructor(private logger : LoggingService) { }
  logClick() {
    this.logger.log();
  }


  name:string = "Welcome to my Angular 2 app";
  textName:string = "Here's input data";
  isRequired: boolean = true;
  //
  // // custom event binding
  // @Output() onEvent = new EventEmitter();
  // fireEvent(e) {
  //   this.onEvent.emit(e);
  // }

  // custom property binding
  // @Input() game;  // from the app component

  // game = {
  //   name : "Super Mario 64",
  //   publisher : "Nintendo"
  // }

  onButtonClick(val:string) {
    alert("I like " + val);
  }

  ngOnInit() {
  }

}
