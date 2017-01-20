import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";

// Firebase
declare var firebase: any;

interface Game {
  name: string;
  publisher: string;
}

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
  games: Game[] = [];
  //[
    // { name : "Mario 64", publisher: "Nintendo" },
    // { name : "Battlefield 1", publisher: "EA" },
    // { name : "Dishonored", publisher: "Bethesda" },
  //];

  urlId: string;

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef) {
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
      
      // I didn't like the fact that list didn't load immediately.
      // The filter's `transform` fires before this and then
      // not again until you focus the filter field and then
      // type something or release focus.  You can just add the 
      // following line to force update after initial load,
      // (but that might mean double updates on new entries)

      //this.changeDetectorRef.markForCheck();
    })
  }

  // Alternatively (commented out below), you could load 
  // all the initial values, and then force an update once, 
  // and following that bind to the `child_added` evt.
  // When you bind to the `child_added` evt you will get all
  // the initial values.  
  
  // So a better approach might be to disable the "Add Game"
  // button until you had counted x (duplicate) `child_add` 
  // events, where x is the number of initial values (`root.length`).

  // Disabling the button until the "replay" was complete 
  // didn't occur to me at first though, so I left in filter
  // logic.  The filter logic adds overhead [O(n)] though.

  // You could just filter until you have reached x duplicates
  // and then turn it off.  But that doesn't actually handle
  // the case where the user adds a duplicate while you're
  // still processing the "replay" values.  Or maybe you
  // want the filter logic so you don't ever list duplicates.

  // ...anyways, I've put way too much thought into this 
  // considering I just wanted to resolve the issue with 
  // using `ngModel` on an `<input>`.  Good day.

  // fbGetData() {
  //   // Get the first value (the root: '/')  
  //   firebase.database().ref().once('value', root => { 
  //     // Iterate over root's existing children (games)
  //     root.forEach(child => {
  //       this.games.push(child.val());
  //       console.info(`Child retrieved: ${child.val().name}`);
  //     });

  //     console.info(`Initial children processed: ${this.games.length}`);
  //     this.changeDetectorRef.markForCheck();
  //   }).then(() => {
  //     firebase.database().ref("/").on("child_added", (snapshot) => {
  //       let val: Game = snapshot.val();
  //       let vName: string = val.name.toLowerCase();
  //       let vPub: string = val.publisher.toLowerCase();

  //       // filter out duplicates
  //       if(this.games.map(g => {
  //         // map current games' names and publishers to lowercase, for comparison
  //         return { name: g.name.toLowerCase(), publisher: g.publisher.toLowerCase() };
  //       }).filter(g => {
  //         // remove anything that is not a (case insensitive) match
  //         return g.name === vName && g.publisher === vPub;
  //       }).length === 0) {
  //         // if there are no (case insensitive) matches, add to list
  //         this.games.push(val);
  //         console.info(`Child added: ${snapshot.val().name}`);
  //       } else {
  //         console.warn(`Duplicate detected: ${snapshot.val().name}`);
  //       }
  //     });
  //   });
  // }

  addGameName:string = "";
  addGamePublisher: string ="";
  fbPostData(gameName:string, gamePub:string) {
    firebase.database().ref("/").push({name: gameName, publisher: gamePub});
    alert("The game has been added to the database!");
    this.addGameName = "";
    this.addGamePublisher = "";
  }

}
