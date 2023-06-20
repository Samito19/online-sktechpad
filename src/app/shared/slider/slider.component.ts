import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
})
export class SliderComponent {
  @Output() sliderValue = new EventEmitter<number>();

  disabled = false;
  max = 20;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 1;
  color = 'primary';

  updateSliderValue(value: number) {
    this.value = value;
    this.sliderValue.emit(value);
  }
}
