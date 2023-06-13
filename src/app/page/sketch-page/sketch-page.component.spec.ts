import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchPageComponent } from './sketch-page.component';

describe('SketchPageComponent', () => {
  let component: SketchPageComponent;
  let fixture: ComponentFixture<SketchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SketchPageComponent]
    });
    fixture = TestBed.createComponent(SketchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
