import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchCardComponent } from './sketch-card.component';

describe('SketchCardComponent', () => {
  let component: SketchCardComponent;
  let fixture: ComponentFixture<SketchCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SketchCardComponent]
    });
    fixture = TestBed.createComponent(SketchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
