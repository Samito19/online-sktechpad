import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CanvasDrawing } from '../view/canvas.view';
import { connectToCanvasByName } from '../action/sketch.actions';
import { connectToSketchChatroom } from '../action/sketch.actions';
import { sendDrawingToHub } from '../action/canvas.actions';
import { SketchPageState } from '../state/sketch-page.state';
import { sendChatMessage } from '../action/chat.actions';
import { SignalRHubConnections, SignalRService } from '../signalr.service';

@Injectable()
export class SketchPageService {
  sketchName: string;
  hubConnections: SignalRHubConnections;

  constructor(
    private route: ActivatedRoute,
    private store: Store<SketchPageState>,
    private signalRService: SignalRService
  ) {
    const sketchName = this.route.snapshot.paramMap.get('sketchId')!;
    this.sketchName = sketchName;
  }

  init = () => {
    this.store.dispatch(
      connectToCanvasByName({
        sketchName: 'test',
      })
    );
    this.store.dispatch(
      connectToSketchChatroom({
        sketchName: 'test',
      })
    );
    this.hubConnections = this.signalRService.getAllHubConnections();
    console.log(this.hubConnections);
    this.hubConnections.chat?.on(
      'messageReceived',
      (username, messageContent) => {
        console.log(`${username} : ${messageContent}`);
      }
    );
  };

  sendMessage(messageContent: string) {
    this.store.dispatch(
      sendChatMessage({
        sketchName: 'test',
        username: 'Samsoumite',
        content: messageContent,
      })
    );
  }

  receiveMessage(message: string) {
    console.log(message);
  }

  sendDrawing = (drawing: CanvasDrawing) => {
    this.store.dispatch(sendDrawingToHub(drawing));
  };

  // receiveDrawing = () => {
  //   const newDrawing$ = this.store.select('newDrawing');
  //   return newDrawing$;
  // };
}
