import { changePenWidth } from 'src/app/action/canvas.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  constructor(private store: Store) {}
  changePenWidth(value: number) {
    this.store.dispatch(changePenWidth({ width: value }));
  }
}
