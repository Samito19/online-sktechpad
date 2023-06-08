import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './sketch-page/chat/chat.component';
import { StoreModule } from '@ngrx/store';
import {
  clientIdReducer,
  messagesReducer,
} from './sketch-page/chat/chat.reducers';
import { CanvasComponent } from './sketch-page/canvas/canvas.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SketchCardComponent } from './home/sketch-card/sketch-card.component';
import { SketchPageComponent } from './sketch-page/sketch-page.component';
import { ControlsComponent } from './sketch-page/controls/controls.component';
import { EffectsModule } from '@ngrx/effects';
import { CanvasEffects } from './effect/canvas.effect';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CanvasComponent,
    HomeComponent,
    SketchPageComponent,
    ControlsComponent,
  ],
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
    EffectsModule.forRoot([CanvasEffects]),
  ],
})
export class AppModule {}
