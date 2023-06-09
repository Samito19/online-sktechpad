import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  connections: signalR.HubConnection[];
  async Connect(hub: string) {
    let connection: signalR.HubConnection;
    connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://localhost:5212/${hub}`,
        signalR.HttpTransportType.WebSockets
      )
      .withAutomaticReconnect()
      .build();
    await connection.start().catch((err) => console.log('Conn Error:', err));
    this.connections?.push(connection);
    console.log('number of connections ', this.connections?.length);
    return connection;
  }
}
