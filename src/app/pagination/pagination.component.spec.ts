import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { BehaviorSubject } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const mockedPage$ = new BehaviorSubject(4);
  const mockedCurrentIndex$ = new BehaviorSubject(3);
  const mockedPageArray = [1, 2, 3, 4, 5];
  const mockedCurrentIdx = 3;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show nav button', () => {
    component.currentIndex$ = mockedCurrentIndex$;
    component.totalPages$ = mockedPage$;
    component.pageArray = mockedPageArray;
    mockedCurrentIndex$.next(6);
    mockedPage$.next(5);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.c-pagination__nav').length).toEqual(2);
  });

  it('should show pages button with nav button', () => {
    component.currentIndex$ = mockedCurrentIndex$;
    component.currentIdx = mockedCurrentIdx;
    component.pageArray = mockedPageArray;
    mockedCurrentIndex$.next(3);
    mockedPage$.next(5);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('li').length).toEqual(7);
  });

  it('should show current page with total pages', () => {
    component.currentIndex$ = mockedCurrentIndex$;
    component.totalPages$ = mockedPage$;
    mockedCurrentIndex$.next(1);
    mockedPage$.next(5);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.c-pagination__total p').innerText).toEqual('Page 1 of 5');
  });

  it('should show pages button with nav button', () => {
    component.currentIndex$ = mockedCurrentIndex$;
    component.currentIdx = mockedCurrentIdx;
    component.pageArray = mockedPageArray;
    mockedCurrentIndex$.next(3);
    mockedPage$.next(5);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.active').length).toEqual(1);
    expect(fixture.nativeElement.querySelector('.active').innerText).toEqual('3');
  });
});
