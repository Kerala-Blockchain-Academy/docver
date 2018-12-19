import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthFormComponent } from './birth-form.component';

describe('BirthFormComponent', () => {
  let component: BirthFormComponent;
  let fixture: ComponentFixture<BirthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
