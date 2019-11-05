import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { GridComponent } from './grid/grid.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FilterComponent,
        GridComponent,
        PaginationComponent
      ],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show grid component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement.querySelectorAll('.c-grid')).toBeTruthy();
  });

  it('should show pagination component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement.querySelectorAll('.c-pagination')).toBeTruthy();
  });

  it('should show filter component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement.querySelectorAll('.c-filter')).toBeTruthy();
  });
});
