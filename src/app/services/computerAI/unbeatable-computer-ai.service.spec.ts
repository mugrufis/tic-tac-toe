import { TestBed } from '@angular/core/testing';

import { UnbeatableComputerAIService } from './unbeatable-computer-ai.service';

describe('UnbeatableComputerAIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnbeatableComputerAIService = TestBed.get(UnbeatableComputerAIService);
    expect(service).toBeTruthy();
  });
});
