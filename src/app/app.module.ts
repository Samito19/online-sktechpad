import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { clientIdReducer, messagesReducer } from './chat/chat.reducers';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [AppComponent, ChatComponent, CanvasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      messages: messagesReducer,
      clientId: clientIdReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
