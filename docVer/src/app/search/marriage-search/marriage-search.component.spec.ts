import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageSearchComponent } from './marriage-search.component';

describe('MarriageSearchComponent', () => {
  let component: MarriageSearchComponent;
  let fixture: ComponentFixture<MarriageSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
