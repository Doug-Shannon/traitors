import { TestBed, inject } from '@angular/core/testing';

import { FirestoreHelperService } from './firestore-helper.service';

describe('FirestoreHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreHelperService]
    });
  });

  it('should be created', inject([FirestoreHelperService], (service: FirestoreHelperService) => {
    expect(service).toBeTruthy();
  }));
});
