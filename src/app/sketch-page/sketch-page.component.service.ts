import { SketchPageComponent } from './sketch-page.component';
import { Injectable } from '@angular/core';
import p5 from 'p5';
import { Observable, Subscription } from 'rxjs';
import { CanvasDrawing } from 'src/app/model/canvas/canvas.models';
import { Store } from '@ngrx/store';
import { CanvasService } from '../service/canvas.service';

@Injectable()
export class SketchPageComponentService {}
