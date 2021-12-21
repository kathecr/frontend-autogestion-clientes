import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialAdminComponent } from './tutorial-admin.component';

describe('TutorialAdminComponent', () => {
  let component: TutorialAdminComponent;
  let fixture: ComponentFixture<TutorialAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
