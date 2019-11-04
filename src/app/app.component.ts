import { Component, OnInit, OnDestroy } from '@angular/core';
import Customer from './customer';
import { DatabaseService } from './database.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit, OnDestroy {
  private lists$: Observable<Array<Customer | null>>;
  private unsubscribeObs$: Subject<void>;

  constructor(private db: DatabaseService) {
    this.unsubscribeObs$ = new Subject();
    this.lists$ = this.db.getItemsObs();
    this.lists$
      // .pipe(takeUntil(this.unsubscribeObs$))
      .subscribe((data: Customer[] | null) => {
        console.log(data);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeObs$.next();
    this.unsubscribeObs$.complete();
  }

}
