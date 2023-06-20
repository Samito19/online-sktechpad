import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ChatComponent } from './page/sketch-page/chat/chat.component';
import { HomeComponent } from './page/home/home.component';
import { SketchCardComponent } from './page/home/sketch-card/sketch-card.component';
import { CanvasComponent } from './page/sketch-page/canvas/canvas.component';
import { ControlsComponent } from './page/sketch-page/controls/controls.component';
import { SketchPageComponent } from './page/sketch-page/sketch-page.component';

import { SketchEffects } from './effect/sketch.effects';

import { sketchPageState } from './reducer/sketch-page.reducer';

import { SketchPageService } from './service/sketch-page.service';
import { SliderComponent } from './shared/slider/slider.component';

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
      { path: 'sketch/:sketchId', component: SketchPageComponent },
    ]),
    StoreModule.forRoot({
      sketchPageState,
    }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([SketchEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
    }),
    SketchCardComponent,
    SliderComponent,
  ],
})
export class AppModule {}
