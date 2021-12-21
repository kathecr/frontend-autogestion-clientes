import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUserComponent } from './request-user.component';

describe('RequestUserComponent', () => {
  let component: RequestUserComponent;
  let fixture: ComponentFixture<RequestUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
