import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getPrevMessages, sendChatMessage } from '../action/chat.actions';
import {
  connectToCanvasByName,
  connectToSketchChatroom,
} from '../action/sketch.actions';
import { CanvasService } from './canvas.service';
import { SketchPageState } from '../state/sketch-page.state';
import { HttpClient } from '@angular/common/http';
import { UserMessageDto } from '../model/network/user.model';
import { ApiUrls } from '../model/network/api-urls';
import {
  selectSketchPageStateMessages,
  selectSketchPageStateNewDrawing,
} from '../selector/sketch-page.selectors';
import { Observable } from 'rxjs';
import { CanvasDrawing } from '../view/canvas.view';

@Injectable()
export class SketchPageService {
  sketchName: string;
  messages$: Observable<UserMessageDto[]>;
  newDrawing$: Observable<CanvasDrawing | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<SketchPageState>,
    private http: HttpClient
  ) {
    this.messages$ = this.store.pipe(select(selectSketchPageStateMessages));
    this.newDrawing$ = this.store.pipe(select(selectSketchPageStateNewDrawing));
  }

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
    this.http
      .get<UserMessageDto[]>(ApiUrls.GetMessages + sketchName)
      .subscribe((prevMessages) =>
        this.store.dispatch(getPrevMessages({ prevMessages }))
      );
  };

  sendMessage(messageContent: string) {
    const newUserMessageDto: UserMessageDto = {
      sketchName: this.sketchName,
      username: 'Samsoumite',
      content: messageContent,
    };
    this.store.dispatch(sendChatMessage(newUserMessageDto));
  }
}
