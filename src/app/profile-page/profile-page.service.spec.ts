import { TestBed } from '@angular/core/testing';

import { ProfilePageService } from './profile-page.service';

describe('ProfilePageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilePageService = TestBed.get(ProfilePageService);
    expect(service).toBeTruthy();
  });
});
