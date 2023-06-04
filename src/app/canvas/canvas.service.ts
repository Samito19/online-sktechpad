import { Observable, Subject } from 'rxjs';
import { SignalRService } from '../signalr.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  connection: signalR.HubConnection;
  private otherDrawingsSubject: Subject<number[]> = new Subject<number[]>();
  otherDrawings$: Observable<number[]> =
    this.otherDrawingsSubject.asObservable();

  constructor(private signalRService: SignalRService) {}

  async initCanvasHubConnection() {
    this.connection = await this.signalRService.Connect('canvas');
    console.log('Connection: ', this.connection);
    this.connection.on(
      'canvasReceived',
      (mouseX: number, mouseY: number, pmouseX: number, pmouseY: number) => {
        const drawings: number[] = [mouseX, mouseY, pmouseX, pmouseY];
        this.otherDrawingsSubject.next(drawings);
      }
    );
  }

  sendCanvas(mouseX: number, mouseY: number, pmouseX: number, pmouseY: number) {
    this.connection.send('newCanvas', mouseX, mouseY, pmouseX, pmouseY);
  }

  getOtherDrawings(): Observable<number[]> {
    return this.otherDrawings$;
  }
}
