import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SignalRHubs } from './model/hub/hub.models';

export type SignalRHubConnections = {
  [key in SignalRHubs]: signalR.HubConnection | null;
};

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  connections: SignalRHubConnections = { canvas: null, chat: null };
  async Connect(hub: string, sketchName: string) {
    let connection: signalR.HubConnection;
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
        break;
      case SignalRHubs.Chat:
        connection?.invoke('AddToSketchChatGroup', sketchName);
        this.connections.chat = connection;
        break;
    }
  }

  getHubConnection(hub: SignalRHubs) {
    return this.connections[hub];
  }

  getAllHubConnections() {
    return this.connections;
  }
}
