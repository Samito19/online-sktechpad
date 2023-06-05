import { Observable, Subject } from 'rxjs';
import { SignalRService } from '../signalr.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  connection: signalR.HubConnection;
  private otherDrawingsSubject: Subject<number[]> = new Subject<number[]>();
  private prevDrawingsSubject: Subject<number[][]> = new Subject<number[][]>();

  otherDrawings$: Observable<number[]> =
    this.otherDrawingsSubject.asObservable();
  prevDrawings$: Observable<number[][]> =
    this.prevDrawingsSubject.asObservable();

  constructor(
    private signalRService: SignalRService,
    private http: HttpClient
  ) {
    this.http
      .get<number[][]>('http://localhost:5212/getDrawings')
      .subscribe((data) => {
        this.prevDrawingsSubject.next(data);
      });
  }

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

  async sendCanvas(
    mouseX: number,
    mouseY: number,
    pmouseX: number,
    pmouseY: number
  ) {
    let p = await this.connection.send(
      'newCanvas',
      Number(mouseX),
      Number(mouseY),
      Number(pmouseX),
      Number(pmouseY)
    );
  }

  getOtherDrawings(): Observable<number[]> {
    return this.otherDrawings$;
  }

  getPrevDrawings(): Observable<number[][]> {
    return this.prevDrawings$;
  }

  clearCanvas() {
    this.http
      .get<any>('http://localhost:5212/clearDrawings')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
