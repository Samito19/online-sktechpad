import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  async Connect(hub: string): Promise<signalR.HubConnection> {
    let connection: signalR.HubConnection;
    connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://localhost:5212/${hub}`,
        signalR.HttpTransportType.WebSockets
      )
      .withAutomaticReconnect()
      .build();
    await connection.start().catch((err) => console.log(err));
    return connection;
  }
}
