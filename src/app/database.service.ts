import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Customer from './customer';
import { take, catchError } from 'rxjs/operators';
import { ReplaySubject, Observable, of } from 'rxjs';
import Search from './filter/search';

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
  private pageNum$: ReplaySubject<number>;
  private totalPages$: ReplaySubject<number>;

  constructor(private http: HttpClient) {
    this.data = [];
    this.database$ = new ReplaySubject();
    this.currPageList$ = new ReplaySubject();

    this.currentIndex = 1;
    this.currentIndex$ = new ReplaySubject();

    this.pageNum = 15;
    this.pageNum$ = new ReplaySubject();
    this.totalPages$ = new ReplaySubject();

    // fetch data from server
    this.fetchData();
  }

  fetchData(): void {
    // get data from server
    const db$ = this.http.get('//www.json-generator.com/api/json/get/cpNVzXeBRu');

    // set data to service and take once only for default
    db$
      .pipe(take(1))
      .pipe(catchError(error => {
        console.log(`Bad request: ${error.message}`);
        return of([]);
      }))
      .subscribe((list: Customer[]) => {
        this.data = list;
        this.database$.next(list);
        this.currPageList$.next(list.slice(0, this.pageNum));
        this.pageNum$.next(this.pageNum);
        this.totalPages$.next(Math.ceil(list.length / this.pageNum));
        this.currentIndex$.next(1);
      });
  }

  setIndex(index: number, data?: Customer[]): void {
    // set page index
    this.currentIndex = index;
    this.currentIndex$.next(index);

    // update current page items
    this.setCurrentPageItems(data ? data : this.data);
  }

  setCurrentPageItems(data: Customer[]) {
    const startIndex = (this.currentIndex - 1) * this.pageNum;

    // recalculate page number
    this.totalPages$.next(Math.ceil(data.length / this.pageNum));

    // slice the full list to pageNum qty, starts from startIndex, e.g. 0 to 15, 15 to 30
    this.currPageList$.next(data.slice(startIndex, startIndex + this.pageNum));
  }

  filterItem(search: Search) {
    if (search.field === '') {
      return;
    }

    const newData = this.data.filter(item => item[search.field].toLowerCase().indexOf(search.keyword.toLowerCase()) >= 0);

    // recalculate page number and total pages
    this.setIndex(1, newData);
  }

  resetItem() {
    this.setCurrentPageItems(this.data);
  }

  getFullListObs(): Observable<Array<Customer | null>> {
    // return current page list as observable
    return this.database$.asObservable();
  }

  getItemsObs(): Observable<Array<Customer | null>> {
    // return current page list as observable
    return this.currPageList$.asObservable();
  }

  getPageNumObs(): Observable<number> {
    return this.pageNum$.asObservable();
  }

  getTotalPagesObs(): Observable<number> {
    // return total page numbers as observable
    return this.totalPages$.asObservable();
  }

  getIndexObs(): Observable<number> {
    // return current index as observable
    return this.currentIndex$.asObservable();
  }
}
