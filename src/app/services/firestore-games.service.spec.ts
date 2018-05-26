import { TestBed, inject } from '@angular/core/testing';

import { FirestoreGamesService } from './firestore-games.service';

describe('FirestoreGamesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreGamesService]
    });
  });

  it(
    'should be created',
    inject([FirestoreGamesService], (service: FirestoreGamesService) => {
      expect(service).toBeTruthy();
    })
  );
});
