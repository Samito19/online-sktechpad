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
import { UserMessageDto } from '../model/network/user.model';

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
        tap(async (action) => {
          console.log(action);
          await this.signalRService.Connect(
            SignalRHubs.Chat,
            action.sketchName
          );
        })
      ),
    { dispatch: false }
  );

  sendMessageToHub = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendChatMessage),
        tap(async (message: UserMessageDto) => {
          const chatHubConnection = this.signalRService.getHubConnection(
            SignalRHubs.Chat
          );
          chatHubConnection?.invoke(
            'newMessage',
            message.username,
            message.content,
            message.sketchName
          );
        })
      ),
    { dispatch: false }
  );
}
