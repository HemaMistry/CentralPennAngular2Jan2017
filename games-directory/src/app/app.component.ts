import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcome to my database';

  game = {
    name : "Assassin's Creed",
    publisher : "Ubisoft"
  }

  onAction(e) {
    alert("I am clicked in the home component")
    console.log(e);
  }


}
