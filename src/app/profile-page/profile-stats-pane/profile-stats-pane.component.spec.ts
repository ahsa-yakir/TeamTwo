import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatsPaneComponent } from './profile-stats-pane.component';

describe('ProfileStatsPaneComponent', () => {
  let component: ProfileStatsPaneComponent;
  let fixture: ComponentFixture<ProfileStatsPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStatsPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
