import { Component, OnInit, Input } from '@angular/core';
import Customer from '../customer';
import { Observable } from 'rxjs';
import Types from './types';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
  @Input() data$: Observable<Customer>;
  private sortBy: string;
  private sortType: Types;

  constructor() {
    this.sortBy = '';
    this.sortType = {
      id: false,
      name: false,
      phone: false,
      email: false
    };
  }

  ngOnInit() {
  }



}
