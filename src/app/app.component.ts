import { Component } from '@angular/core';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';

@Component({
  selector: 'npd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng6-notify-popup-demo';

  constructor(
    private notify: Ng6NotifyPopupService
  ) {

  }

  test() {
    this.notify.show('Success');
  }
}
