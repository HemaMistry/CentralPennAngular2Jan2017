import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";

// Firebase
declare var firebase: any;

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectoryComponent implements OnInit {

  // ngif
  showParagraph: boolean = false;

  // ngclass
  classes = {"blue": false, "red": true, "underline": true};

  // ngfor
  searchTerm: string = "";
  games = [
    // { name : "Mario 64", publisher: "Nintendo" },
    // { name : "Battlefield 1", publisher: "EA" },
    // { name : "Dishonored", publisher: "Bethesda" },
  ];

  urlId: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.urlId = route.snapshot.params['id'];
  }

  ngOnInit() {
    // this.dataService.fetchData().subscribe(
    //   (data) => this.games = data
    // );
    this.fbGetData();
  }

  fbGetData() {
    firebase.database().ref("/").on("child_added", (snapshot) => {
      this.games.push(snapshot.val());
    })
  }

  addGameName:string = "";
  addGamePublisher: string ="";
  fbPostData(gameName:string, gamePub:string) {
    firebase.database().ref("/").push({name: gameName, publisher: gamePub});
    alert("The game has been added to the database!");
    this.addGameName = "";
    this.addGamePublisher = "";
  }

}
