import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthSearchComponent } from './birth-search.component';

describe('BirthSearchComponent', () => {
  let component: BirthSearchComponent;
  let fixture: ComponentFixture<BirthSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
