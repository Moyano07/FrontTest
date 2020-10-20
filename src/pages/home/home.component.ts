import { Component, OnInit } from '@angular/core';
import { Observable,of, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { tap, map, switchMap, shareReplay } from 'rxjs/operators';
import { ProjectService } from 'src/services/project.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resourceProjects$ :Observable<any>;
  trackBy: (index: any, element: any) => any;

  constructor(private projectservice:ProjectService)  {

    this.trackBy = (index, element) => element.id;

   }

  ngOnInit(){
    this.resourceProjects$ = of({}).pipe(
      switchMap(()=> this.projectservice.getProject()),
      shareReplay()
    );
  }

  ionViewWillEnter() {
    
  }

}
