import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyitComponent } from './verifyit.component';

describe('VerifyitComponent', () => {
  let component: VerifyitComponent;
  let fixture: ComponentFixture<VerifyitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
