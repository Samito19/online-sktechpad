import { Observable, Subject } from 'rxjs';
import { SignalRService } from '../signalr.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { drawOtherRealTimeDrawings } from '../action/sketch.actions';
import { CanvasDrawing } from 'src/app/model/canvas/canvas.models';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  connection: signalR.HubConnection;
  clientId: string;

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

  async connectToSketchCanvas(sketchName: string) {
    this.connection = await this.signalRService.Connect('canvas');
    await this.connection.invoke('AddToSketchCanvasGroup', sketchName);
  }

  receiveOtherRealTimeDrawings(): void {
    this.connection.on(
      'newSketchCanvasDrawings',
      this.handleOtherRealTimeDrawings
    );
  }

  handleOtherRealTimeDrawings = (
    mouseX: number,
    mouseY: number,
    pmouseX: number,
    pmouseY: number
  ) => {
    const drawing: CanvasDrawing = { mouseX, mouseY, pmouseX, pmouseY };
    // dispatch an action with the payload
    this.store.dispatch(drawOtherRealTimeDrawings(drawing));
  };

  //TODO Extract to canvas api service - this returned object can be saved in a state object using a reducer that handles getPrevDrawingsSuccess
  getPrevDrawings(): Observable<number[][]> {
    return this.http.get<number[][]>('http://localhost:5212/getDrawings');
  }

  clearCanvas() {
    this.http.get<any>('http://localhost:5212/clearDrawings');
  }
}
