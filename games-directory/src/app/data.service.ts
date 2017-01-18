import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable"
import "rxjs/Rx";

@Injectable()
export class DataService {

  // url:string = "/data.json";
  url:string = "https://ng-centralpenndotnet.firebaseio.com/.json";

  constructor(private http : Http) { }

  fetchData() {
    return this.http.get(this.url).map(
      (res) => res.json()
    );
    //   .subscribe(
    //   (data) => console.log(data)
    // )
  }

}
