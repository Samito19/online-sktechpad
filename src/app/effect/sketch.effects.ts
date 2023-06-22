import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { sendChatMessage } from '../action/chat.actions';
import {
  connectToCanvasByName,
  connectToSketchChatroom,
} from '../action/sketch.actions';
import { SignalRHubs } from '../model/hub/hub.models';
import { SignalRService } from '../signalr.service';
import { sendDrawingToHub } from './../action/canvas.actions';

@Injectable()
export class SketchEffects {
  constructor(
    private actions$: Actions,
    private signalRService: SignalRService
  ) {}

  connectToCanvasDataSignalr = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToCanvasByName),
        tap(async (action) => {
          if (action.sketchName) {
            await this.signalRService.Connect(
              SignalRHubs.Canvas,
              action.sketchName
            );
          }
        })
      ),
    { dispatch: false }
  );

  connectToSketchChatroomDataSignalr = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToSketchChatroom),
        tap(async (action) => {
          if (action.sketchName) {
            await this.signalRService.Connect(
              SignalRHubs.Chat,
              action.sketchName
            );
          }
        })
      ),
    { dispatch: false }
  );

  sendMessageToHub = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendChatMessage),
        tap(async ({ type, ...payload }) => {
          this.signalRService.sendPayloadToHub(SignalRHubs.Chat, payload);
        })
      ),
    { dispatch: false }
  );

  sendDrawingToHub = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendDrawingToHub),
        tap(async ({ type, ...payload }) => {
          this.signalRService.sendPayloadToHub(SignalRHubs.Canvas, payload);
        })
      ),
    { dispatch: false }
  );
}
