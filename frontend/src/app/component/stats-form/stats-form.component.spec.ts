import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsFormComponent } from './stats-form.component';

describe('StatsFormComponent', () => {
  let component: StatsFormComponent;
  let fixture: ComponentFixture<StatsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsFormComponent]
    });
    fixture = TestBed.createComponent(StatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
