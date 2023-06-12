import { SignalRService } from '../signalr.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { sendDrawingToHub } from '../action/canvas.actions';

@Injectable()
export class CanvasEffects {
  constructor(
    private actions$: Actions,
    private signalRService: SignalRService
  ) {}

  // sendDrawingToHub = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(sendDrawingToHub),
  //       tap(async (drawing) => {
  //         this.signalRService.sendPayloadToHub(drawing);
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
