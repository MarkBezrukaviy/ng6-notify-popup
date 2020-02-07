import { Component } from '@angular/core';
import { NgxNotifyPopupService } from '../../projects/ngx-notify-popup/src/lib/services/ngx-notify-popup.service';

@Component({
  selector: 'npd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-notify-popup-demo';

  constructor(
    private notify: NgxNotifyPopupService
  ) {

  }

  test() {
    this.notify.show({ text: 'Success', type: 'success' });
  }
}
