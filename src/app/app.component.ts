import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import Customer from './customer';
import { DatabaseService } from './database.service';
import { Subject, Observable, combineLatest, BehaviorSubject, zip } from 'rxjs';
import { takeUntil, mergeMap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit, OnDestroy {
  @Input() sortType$: Observable<string> = new Observable();

  private lists$: Observable<Array<Customer | null>>;
  private sortSetting$: BehaviorSubject<string> = new BehaviorSubject('');
  private unsubscribeObs$: Subject<void>;
  private isAsc: boolean;

  constructor(private db: DatabaseService) {
    this.unsubscribeObs$ = new Subject();
    this.lists$ = this.db.getItemsObs();
    this.isAsc = true;

    this.lists$
      .pipe(takeUntil(this.unsubscribeObs$))
      .pipe(
        list$ => combineLatest(list$, this.sortSetting$.asObservable()),
      )
      .subscribe(([list, type]) => type !== '' ?
        list.sort(this.sortSwitch(type)) :
        '');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeObs$.next();
    this.unsubscribeObs$.complete();
  }

  onSort(type: string) {
    // get output from grid component
    // if field is the same, reverse the order, otherwise set to asc
    if (type === this.sortSetting$.getValue()) {
      this.isAsc = !this.isAsc;
    } else {
      this.isAsc = true;
    }

    this.sortSetting$.next(type);
  }

  sortSwitch(type: string) {
    return this.sortBy(type, this.isAsc);
  }

  sortBy(type: string, isAsc: boolean) {
    // comparator function to sort by keys
    if (type === '') {
      return;
    }
    return (a: Customer, b: Customer) => {
      if (a[type] < b[type]) {
        return isAsc ? -1 : 1;
      }
      if (a[type] > b[type]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    };
  }

  setPage(num: number) {
    // reset sort settings
    this.isAsc = true;
    this.sortSetting$.next('');

    this.db.setIndex(num);
  }
}
