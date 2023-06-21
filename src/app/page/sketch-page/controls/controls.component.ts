import { changePenWidth, toggleTool } from 'src/app/action/canvas.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SketchPageService } from 'src/app/service/sketch-page.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  toggledTool$: Observable<string | null>;
  constructor(
    private store: Store,
    private sketchPageService: SketchPageService
  ) {
    this.toggledTool$ = this.sketchPageService.toggledTool$;
  }

  showTool(tool: string | null) {
    this.store.dispatch(toggleTool({ tool }));
  }
  changePenWidth(value: number) {
    this.store.dispatch(changePenWidth({ width: value }));
  }
}
