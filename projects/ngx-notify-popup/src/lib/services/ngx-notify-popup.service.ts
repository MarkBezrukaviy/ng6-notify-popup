import { ComponentRef, Injectable } from '@angular/core';
import { INotificationConfig } from '../notificationConfig';
import { NgxNotifyPopupComponent } from '../ngx-notify-popup.component';
import { ComponentInjectService } from './component-inject.service';

@Injectable({
  providedIn: 'root'
})
export class NgxNotifyPopupService {
  private defaultConfig: INotificationConfig = {
    position: 'bottom',
    duration: 3000,
    type: 'error',
    location: 'body',
    sticky: false,
    text: ''
  };
  private activeNotificationCompRef: ComponentRef<any>;
  private clearTime: number;
  private clearHide: number;

  constructor(private compInject: ComponentInjectService) {
  }

  public destroy(): void {
    clearTimeout(this.clearTime);
    clearTimeout(this.clearHide);
    if (this.activeNotificationCompRef) {
      this.compInject.destroyComponent(this.activeNotificationCompRef);
      this.activeNotificationCompRef = null;
    }
  }

  public show(notificationConfig: INotificationConfig): void {
    this.destroy();
    const config: INotificationConfig = { ...this.defaultConfig, ...notificationConfig };

    if (config.location === 'body') {
      this.activeNotificationCompRef = this.compInject.appendComponentToBody(NgxNotifyPopupComponent, config);
    } else {
      this.activeNotificationCompRef = this.compInject.appendComponent(
        NgxNotifyPopupComponent,
        config,
        document.querySelector(config.location)
      );
    }

    this.activeNotificationCompRef.instance.fade = 'show';

    if (this.activeNotificationCompRef.instance.sticky) {
      this.activeNotificationCompRef.instance.destroyComponent.subscribe(() => {
        this.activeNotificationCompRef.instance.fade = 'hide';
        this.clearHide = window.setTimeout(() => {
          this.destroy();
        }, 700);
      });
    } else {
      this.clearTime = window.setTimeout(() => {
        this.activeNotificationCompRef.instance.fade = 'hide';
        this.clearHide = window.setTimeout(() => {
          this.destroy();
        }, 700);
      }, config.duration);
    }
  }
}
