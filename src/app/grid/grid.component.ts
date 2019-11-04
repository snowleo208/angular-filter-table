import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Customer from '../customer';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
  @Input() data$: Observable<Customer>;
  @Input() isAsc: boolean;
  @Input() sortSetting$: BehaviorSubject<string>;
  @Output() sortType: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSort(type: string) {
    this.sortType.emit(type);
  }

}
