import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.db.filterItem(f.value);
  }

}
