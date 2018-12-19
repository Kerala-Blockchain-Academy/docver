import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathFormComponent } from './death-form.component';

describe('DeathFormComponent', () => {
  let component: DeathFormComponent;
  let fixture: ComponentFixture<DeathFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
