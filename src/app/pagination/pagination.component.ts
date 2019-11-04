import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() totalPages$: Observable<number> = new Observable();
  @Input() currentIndex$: Observable<number> = new Observable();
  @Output() page: EventEmitter<any> = new EventEmitter();
  private pageArray: Array<number> = [];
  private currentIdx: number;
  private unsubscribeObs$: Subject<void> = new Subject();

  constructor() {
  }

  ngOnInit() {
    this.totalPages$
      .pipe(takeUntil(this.unsubscribeObs$))
      .subscribe(num => {
        this.pageArray = Array.from({ length: num }, (v, n) => n + 1); // create array for page numbers
      });

    this.currentIndex$
      .pipe(takeUntil(this.unsubscribeObs$))
      .subscribe(n => this.currentIdx = n);
  }

  ngOnDestroy() {
    this.unsubscribeObs$.next();
    this.unsubscribeObs$.complete();
  }

  triggerPage(n: number) {
    // make n to be within range of pages
    if (!n) {
      return;
    }

    if (n <= 0) {
      n = 0;
    }

    if (n > this.pageArray.length) {
      n = this.pageArray.length;
    }

    this.page.emit(n);

    window.scroll(0, 0);
  }

}
