import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignlarRService {
  connection: signalR.HubConnection;

  async Connect(hub: string): Promise<signalR.HubConnection> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://localhost:5212/${hub}`,
        signalR.HttpTransportType.WebSockets
      )
      .build();
    await this.connection.start().catch((err) => console.log(err));
    return this.connection;
  }
}
