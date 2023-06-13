import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sketch-card',
  templateUrl: './sketch-card.component.html',
  styleUrls: ['./sketch-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class SketchCardComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
