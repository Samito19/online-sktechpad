import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { clientIdReducer, messagesReducer } from './chat/chat.reducers';
import { CanvasComponent } from './canvas/canvas.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SketchCardComponent } from './home/sketch-card/sketch-card.component';

@NgModule({
  declarations: [AppComponent, ChatComponent, CanvasComponent, HomeComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      messages: messagesReducer,
      clientId: clientIdReducer,
    }),
    BrowserAnimationsModule,
    SketchCardComponent,
  ],
})
export class AppModule {}
