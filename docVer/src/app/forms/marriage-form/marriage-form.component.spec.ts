import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageFormComponent } from './marriage-form.component';

describe('MarriageFormComponent', () => {
  let component: MarriageFormComponent;
  let fixture: ComponentFixture<MarriageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
