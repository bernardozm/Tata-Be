import { Component } from '@angular/core';
import { TimelineComponent } from './components/timeline/timeline.component';

@Component({
  selector: 'app-root',
  template: '<app-timeline></app-timeline>',
  standalone: true,
  imports: [TimelineComponent],
})
export class AppComponent {}
