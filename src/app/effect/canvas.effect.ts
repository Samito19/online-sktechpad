import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { SignalRService } from '../signalr.service';
import { connectCanvasName } from '../sketch-page/canvas/canvas-component.actions';
import { CanvasService } from '../sketch-page/canvas/canvas.service';

@Injectable()
export class CanvasEffects {
  constructor(
    private actions$: Actions,
    private canvasService: CanvasService
  ) {}

  connectToCanvasDataSignalr = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectCanvasName),
        tap(async (action) => {
          await this.canvasService.initCanvasHubConnection();
          this.canvasService.connectToSketchCanvas(action.canvasName);
          this.canvasService.getPrevDrawings()
          this.canvasService.getOtherDrawings()
        })
      ),
    { dispatch: false }
  );
}
