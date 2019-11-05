import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
    ],
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
