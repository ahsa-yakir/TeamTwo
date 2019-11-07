import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileVideoCarouselComponent } from "./profile-video-carousel.component";

describe("ProfileVideoCarouselComponent", () => {
  let component: ProfileVideoCarouselComponent;
  let fixture: ComponentFixture<ProfileVideoCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileVideoCarouselComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVideoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
