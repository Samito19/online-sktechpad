import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { sendChatMessage } from '../../action/chat.actions';
import {
  connectToCanvasByName,
  connectToSketchChatroom,
} from '../../action/sketch.actions';
import { CanvasService } from '../../service/canvas.service';
import { SketchPageState } from '../../state/sketch-page.state';

@Injectable()
export class SketchPageService {
  sketchName: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<SketchPageState>,
    private canvasService: CanvasService
  ) {}

  init = () => {
    const sketchName = this.route.children[0].snapshot.params['sketchId'] ?? 0;

    this.sketchName = sketchName;
    this.store.dispatch(
      connectToCanvasByName({
        sketchName,
      })
    );
    this.store.dispatch(
      connectToSketchChatroom({
        sketchName,
      })
    );
    this.canvasService.init(sketchName);
  };

  disconnect = () => {
    this.canvasService.disconnect();
  };

  sendMessage(messageContent: string) {
    this.store.dispatch(
      sendChatMessage({
        sketchName: this.sketchName,
        username: 'Samsoumite',
        content: messageContent,
      })
    );
  }

  receiveMessage(message: string) {}
}
