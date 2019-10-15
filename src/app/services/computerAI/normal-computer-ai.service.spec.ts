import { TestBed } from '@angular/core/testing';

import { NormalComputerAIService } from './normal-computer-ai.service';

describe('NormalComputerAIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormalComputerAIService = TestBed.get(NormalComputerAIService);
    expect(service).toBeTruthy();
  });
});
