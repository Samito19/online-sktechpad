import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { messagesReducer } from './chat/chat.reducers';

@NgModule({
  declarations: [AppComponent, ChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ messages: messagesReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
