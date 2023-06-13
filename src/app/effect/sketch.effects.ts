import {
  sendDrawingToHub,
  receiveRealTimeDrawings,
} from './../action/canvas.actions';
import { SignalRService } from '../signalr.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import {
  connectToCanvasByName,
  connectToSketchChatroom,
} from '../action/sketch.actions';
import { SignalRHubs } from '../model/hub/hub.models';
import { sendChatMessage } from '../action/chat.actions';
import { IUserMessageDto } from '../model/network/user.model';
import { CanvasService } from '../service/canvas.service';

@Injectable()
export class SketchEffects {
  constructor(
    private actions$: Actions,
    private signalRService: SignalRService,
    private canvasService: CanvasService
  ) {}

  connectToCanvasDataSignalr = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToCanvasByName),
        tap(async (action) => {
          await this.signalRService.Connect(
            SignalRHubs.Canvas,
            action.sketchName
          );
        })
      ),
    { dispatch: false }
  );

  connectToSketchChatroomDataSignalr = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToSketchChatroom),
        tap(async ({ type, ...payload }) => {
          await this.signalRService.Connect(
            SignalRHubs.Chat,
            payload.sketchName
          );
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

  receiveRealTimeDrawings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(receiveRealTimeDrawings),
        tap(({ type, ...payload }) => {
          console.log('payload in effect: ', payload);
          this.canvasService.handleOtherRealTimeDrawings(payload);
        })
      ),
    { dispatch: false }
  );
}
