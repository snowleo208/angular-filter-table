import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Customer from './customer';
import { take } from 'rxjs/operators';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private currentIndex: number;
  private pageNum: number;
  private data: Array<Customer | null>;
  private database$: ReplaySubject<Customer[]>;
  private currPageList$: ReplaySubject<Customer[]>;
  private currentIndex$: ReplaySubject<number>;

  constructor(private http: HttpClient) {
    this.currentIndex = 1;
    this.pageNum = 15;
    this.data = [];
    this.database$ = new ReplaySubject();
    this.currentIndex$ = new ReplaySubject();
    this.currPageList$ = new ReplaySubject();

    // fetch data from server
    this.fetchData();
    this.setIndex(1);
  }

  fetchData(): void {
    // get data from server
    const db$ = this.http.get('http://www.json-generator.com/api/json/get/cpNVzXeBRu');

    // set data to service and take once only for default
    db$
      .pipe(take(1))
      .subscribe((list: Customer[]) => {
        this.data = list;
        this.database$.next(list);
        this.currPageList$.next(list.slice(0, this.pageNum));
      });
  }

  setIndex(index: number): void {
    // set page index
    this.currentIndex = index;
    this.currentIndex$.next(index);
  }

  getFullListObs(): Observable<Array<Customer | null>> {
    // return current page list as observable
    return this.database$.asObservable();
  }

  getItemsObs(): Observable<Array<Customer | null>> {
    // return current page list as observable
    return this.currPageList$.asObservable();
  }

  getPageNum(): number {
    return this.pageNum;
  }

  getIndexObs(): Observable<number> {
    // return current index as observable
    return this.currentIndex$.asObservable();
  }
}
