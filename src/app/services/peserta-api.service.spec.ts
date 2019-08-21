import { TestBed } from '@angular/core/testing';

import { PesertaApiService } from './peserta-api.service';

describe('PesertaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PesertaApiService = TestBed.get(PesertaApiService);
    expect(service).toBeTruthy();
  });
});
