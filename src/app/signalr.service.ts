import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SignalRHubs } from './model/hub/hub.models';
import { IUserMessageDto, UserMessageDto } from './model/network/user.model';
import { CanvasDrawing } from './view/canvas.view';
import { Store } from '@ngrx/store';
import { receiveRealTimeDrawings } from './action/canvas.actions';
import { getChatMessage } from './action/chat.actions';

export type SignalRHubConnections = {
  [key in SignalRHubs]: signalR.HubConnection | null;
};

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(private store: Store) {}
  sketchName: string;
  private connections: SignalRHubConnections = { canvas: null, chat: null };
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
    switch (hub) {
      case SignalRHubs.Canvas:
        connection?.invoke('AddToSketchCanvasGroup', sketchName);
        this.connections.canvas = connection;
        connection.on(
          'newSketchCanvasDrawings',
          (mouseX, mouseY, pmouseX, pmouseY) => {
            this.store.dispatch(
              receiveRealTimeDrawings({ mouseX, mouseY, pmouseX, pmouseY })
            );
          }
        );
        break;
      case SignalRHubs.Chat:
        connection?.invoke('AddToSketchChatGroup', sketchName);
        this.connections.chat = connection;
        connection.on('messageReceived', (payload) =>
          this.store.dispatch(getChatMessage(payload))
        );
        break;
    }
  }

  sendPayloadToHub<T>(
    hub: SignalRHubs,
    payload: IUserMessageDto | CanvasDrawing
  ) {
    console.log(payload);
    if (hub === SignalRHubs.Chat && payload instanceof UserMessageDto) {
      const { username, content, sketchName } = payload;
      this.connections[hub]?.invoke(
        'newMessage',
        username,
        content,
        sketchName
      );
    } else if (
      hub === SignalRHubs.Canvas &&
      (payload as CanvasDrawing)?.mouseX &&
      (payload as CanvasDrawing)?.mouseY
    ) {
      const { mouseX, mouseY, pmouseX, pmouseY } = payload as CanvasDrawing;
      console.log(this.connections[hub]);
      this.connections[hub]?.invoke(
        'SendSketchCanvasDrawings',
        this.sketchName,
        mouseX,
        mouseY,
        pmouseX,
        pmouseY
      );
    } else {
      console.warn(`Inexistant hub ! Hub: ${hub}`);
    }
  }
}
