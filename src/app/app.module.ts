import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './sketch-page/chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

// import {
//   clientIdReducer,
//   messagesReducer,
// } from './sketch-page/chat/chat.reducers';
import { CanvasComponent } from './sketch-page/canvas/canvas.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SketchCardComponent } from './home/sketch-card/sketch-card.component';
import { SketchPageComponent } from './sketch-page/sketch-page.component';
import { ControlsComponent } from './sketch-page/controls/controls.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { sketchPageState } from './reducer/sketch-page.reducer';
import { SketchPageService } from './sketch-page/sketch-page.service';
import { FormsModule } from '@angular/forms';
import { SketchEffects } from './effect/sketch.effects';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CanvasComponent,
    HomeComponent,
    SketchPageComponent,
    ControlsComponent,
  ],
  providers: [SketchPageService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: ':sketchId', component: SketchPageComponent },
    ]),
    StoreModule.forRoot({
      sketchPageState,
    }),
    BrowserAnimationsModule,
    SketchCardComponent,
    EffectsModule.forRoot([SketchEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
    }),
  ],
})
export class AppModule {}
