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

  // private otherDrawingsSubject: Subject<number[]> = new Subject<number[]>();
  // private prevDrawingsSubject: Subject<number[][]> = new Subject<number[][]>();

  // otherDrawings$: Observable<number[]> =
  //   this.otherDrawingsSubject.asObservable();
  // prevDrawings$: Observable<number[][]> =
  //   this.prevDrawingsSubject.asObservable();

  constructor(
    private signalRService: SignalRService,
    private http: HttpClient,
    private store: Store<{
      clientId: string;
    }>
  ) {
    this.store
      .select('clientId')
      .subscribe((clientId) => (this.clientId = clientId));
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

  getOtherDrawings(): void {
    this.signalRService.Connect('canvas');
    this.connection.on(
      'newSketchCanvasDrawings',
      this.newSketchConnectionHandler
    );
  }

  newSketchConnectionHandler = (
    mouseX: number,
    mouseY: number,
    pmouseX: number,
    pmouseY: number
  ) => {
    const drawings: number[] = [mouseX, mouseY, pmouseX, pmouseY];
    // dispatch an action with the payload
    // this.otherDrawingsSubject.next(drawings);
  };

  //TODO Extract to canvas api service - this returned object can be saved in a state object using a reducer that handles getPrevDrawingsSuccess
  getPrevDrawings(): Observable<number[][]> {
    return this.http.get<number[][]>('http://localhost:5212/getDrawings');
  }

  clearCanvas() {
    this.http
      .get<any>('http://localhost:5212/clearDrawings')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
