import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathSearchComponent } from './death-search.component';

describe('DeathSearchComponent', () => {
  let component: DeathSearchComponent;
  let fixture: ComponentFixture<DeathSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
