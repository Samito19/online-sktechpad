import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { receiveRealTimeDrawings } from './action/canvas.actions';
import { getChatMessage } from './action/chat.actions';
import { SignalRHubs } from './model/hub/hub.models';
import { UserMessageDto } from './model/network/user.model';
import { CanvasDrawing } from './model/canvas/canvas.models';

export type SignalRHubConnections = {
  [key in SignalRHubs]: signalR.HubConnection | null;
};

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  sketchName: string;
  private connections: SignalRHubConnections = { canvas: null, chat: null };

  constructor(private store: Store) {}

  async Connect(hub: string, sketchName: string) {
    let connection: signalR.HubConnection;
    this.sketchName = sketchName;
    connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://localhost:5212/${hub}`,
        signalR.HttpTransportType.WebSockets
      )
      .withAutomaticReconnect()
      .build();
    await connection.start().catch((err) => console.log('Conn Error:', err));
    this.listenToHubs(hub, connection);
  }

  private listenToHubs(hub: string, connection: signalR.HubConnection) {
    switch (hub) {
      case SignalRHubs.Canvas:
        connection?.invoke('AddToSketchCanvasGroup', this.sketchName);
        this.connections.canvas = connection;
        connection.on('newSketchCanvasDrawings', (newDrawing) => {
          this.store.dispatch(receiveRealTimeDrawings(newDrawing));
        });
        break;
      case SignalRHubs.Chat:
        connection?.invoke('AddToSketchChatGroup', this.sketchName);
        this.connections.chat = connection;
        connection.on(
          'messageReceived',
          (username: string, content: string) => {
            const userMessagePayload: UserMessageDto = {
              username,
              content,
            };
            this.store.dispatch(getChatMessage(userMessagePayload));
          }
        );
        break;
    }
  }

  sendPayloadToHub<T>(
    hub: SignalRHubs,
    payload: UserMessageDto | CanvasDrawing
  ) {
    if (
      hub === SignalRHubs.Chat &&
      (payload as UserMessageDto)?.username &&
      (payload as UserMessageDto)?.content
    ) {
      this.connections[hub]?.invoke('newMessage', payload, this.sketchName);
    } else if (
      hub === SignalRHubs.Canvas &&
      (payload as CanvasDrawing)?.mouseX &&
      (payload as CanvasDrawing)?.mouseY
    ) {
      this.connections[hub]?.invoke(
        'SendSketchCanvasDrawings',
        payload,
        this.sketchName
      );
    } else {
      console.warn(`Inexistant hub ! Hub: ${hub}`);
    }
  }
}
