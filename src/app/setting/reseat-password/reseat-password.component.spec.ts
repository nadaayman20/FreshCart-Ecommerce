import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseatPasswordComponent } from './reseat-password.component';

describe('ReseatPasswordComponent', () => {
  let component: ReseatPasswordComponent;
  let fixture: ComponentFixture<ReseatPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReseatPasswordComponent]
    });
    fixture = TestBed.createComponent(ReseatPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
