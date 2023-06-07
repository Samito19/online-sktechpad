import { Observable, Subject } from 'rxjs';
import { SignalRService } from '../../signalr.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  connection: signalR.HubConnection;
  clientId: string;

  private otherDrawingsSubject: Subject<number[]> = new Subject<number[]>();
  private prevDrawingsSubject: Subject<number[][]> = new Subject<number[][]>();

  otherDrawings$: Observable<number[]> =
    this.otherDrawingsSubject.asObservable();
  prevDrawings$: Observable<number[][]> =
    this.prevDrawingsSubject.asObservable();

  constructor(
    private signalRService: SignalRService,
    private http: HttpClient,
    private store: Store<{
      clientId: string;
    }>
  ) {
    this.http
      .get<number[][]>('http://localhost:5212/getDrawings')
      .subscribe((data) => {
        this.prevDrawingsSubject.next(data);
      });
    this.store
      .select('clientId')
      .subscribe((clientId) => (this.clientId = clientId));
  }

  async initCanvasHubConnection() {
    this.connection = await this.signalRService.Connect('canvas');
    console.log('Connection: ', this.connection);
    this.connection.on(
      'newSketchCanvasDrawings',
      (mouseX: number, mouseY: number, pmouseX: number, pmouseY: number) => {
        const drawings: number[] = [mouseX, mouseY, pmouseX, pmouseY];
        this.otherDrawingsSubject.next(drawings);
      }
    );
  }

  async sendCanvas(
    sketchName: string,
    mouseX: number,
    mouseY: number,
    pmouseX: number,
    pmouseY: number
  ) {
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
      await this.connection?.invoke(
        'sendSketchCanvasDrawings',
        sketchName,
        mouseX,
        mouseY,
        pmouseX,
        pmouseY
      );
    }
  }

  connectToSketchCanvas(sketchName: string) {
    this.connection.invoke('AddToSketchCanvasGroup', sketchName);
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
