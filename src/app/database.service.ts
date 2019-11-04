import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Customer from './customer';
import { take } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private currentIndex: number;
  private data: Array<Customer | null>;
  private database$: ReplaySubject<Customer[]>;
  private currentIndex$: ReplaySubject<number>;

  constructor(private http: HttpClient) {
    this.currentIndex = 0;
    this.data = [];
    this.database$ = new ReplaySubject();
    this.currentIndex$ = new ReplaySubject();

    // fetch data from server
    this.fetchData();
  }

  fetchData(): void {
    // get data from server
    const db$ = this.http.get('http://www.json-generator.com/api/json/get/cpNVzXeBRu');

    // set data to service and take once only
    db$
      .pipe(take(1))
      .subscribe((list: Customer[]) => {
        this.data = list;
        this.database$.next(list);
      });
  }

  setIndex(index: number): void {
    // set page index
    this.currentIndex$.next(index);
  }

  getItemsObs(): Observable<Array<Customer | null>> {
    // return current page list as observable
    return this.database$.asObservable();
  }

  getIndexObs(): Observable<number> {
    // return current index as observable
    return this.currentIndex$.asObservable();
  }
}
