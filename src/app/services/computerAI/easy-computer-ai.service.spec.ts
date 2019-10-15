import { TestBed } from '@angular/core/testing';

import { EasyComputerAIService } from './easy-computer-ai.service';

describe('EasyComputerAIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EasyComputerAIService = TestBed.get(EasyComputerAIService);
    expect(service).toBeTruthy();
  });
});
