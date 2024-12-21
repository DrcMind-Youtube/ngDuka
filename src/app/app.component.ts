import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/toolbar.component';
import { FooterComponent } from './shared/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, FooterComponent],
  template: `
    <app-toolbar />
    <router-outlet />
    <br />
    <br />
    <app-footer />
  `,
  styles: [],
})
export class AppComponent {
  title = 'soko';
}
