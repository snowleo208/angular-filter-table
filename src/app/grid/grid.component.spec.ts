import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { BehaviorSubject } from 'rxjs';
import Customer from '../customer';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  const mockedData$: BehaviorSubject<Customer[]> = new BehaviorSubject(null);

  const lists = [
    { email: 'christineballard@ziore.com', id: '5dbfebc4f7c7c9b631a7f48d', phone: '+44 (804) 473-3356', name: 'Christine Ballard' },
    { email: 'ferngoff@ziore.com', id: '5dbfebc449cf8e5d752ee7e0', phone: '+44 (887) 466-2316', name: 'Fern Goff' },
    { email: 'kirklandnavarro@ziore.com', id: '5dbfebc4d682083c7dc1382b', phone: '+44 (834) 549-2121', name: 'Kirkland Navarro' },
    { email: 'ritaburris@ziore.com', id: '5dbfebc49eef745da5e52d61', phone: '+44 (852) 581-3451', name: 'Rita Burris' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading', () => {
    component.data$ = mockedData$;
    mockedData$.next(undefined);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.u-loading')).toBeTruthy();
  });

  it('should show data as list', () => {
    component.data$ = mockedData$;
    mockedData$.next(lists);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tr').length).toEqual(4);
  });

  it('should show no results', () => {
    component.data$ = mockedData$;
    mockedData$.next([]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p').innerText).toEqual('No results.');
  });
});
