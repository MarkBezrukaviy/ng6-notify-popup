import { ComponentRef, Injectable } from '@angular/core';
import { NotificationConfig } from '../notificationConfig';
import { Ng6NotifyPopupComponent } from '../ng6-notify-popup.component';
import { ComponentInjectService } from './component-inject.service';

@Injectable({
  providedIn: 'root'
})
export class Ng6NotifyPopupService {
  private defaultConfigVar: NotificationConfig = new NotificationConfig('bottom', 3000, 'error', 'body', false, '');
  private activeNotificationCompRef: ComponentRef<any>;
  private cleartime: number;
  private clearhide: number;

  constructor(private compInject: ComponentInjectService) {
  }

  public defaultConfig(configObject: Object): void {
    this.setConfig(configObject, this.defaultConfigVar);

  }

  public destroy(): void {
    clearTimeout(this.cleartime);
    clearTimeout(this.clearhide);
    if (this.activeNotificationCompRef) {
      this.compInject.destroyComponent(this.activeNotificationCompRef);
      this.activeNotificationCompRef = null;
    }
  }

  public show(notificationText: string, notificationConfig?: Object): void {
    this.destroy();
    let config: NotificationConfig = new NotificationConfig(this.defaultConfigVar.position, this.defaultConfigVar.duration, this.defaultConfigVar.type, this.defaultConfigVar.location, this.defaultConfigVar.sticky, notificationText);
    if (notificationConfig != undefined && notificationConfig != null)
      this.setConfig(notificationConfig, config);
    if (config.location == 'body')
      this.activeNotificationCompRef = this.compInject.appendComponentToBody(Ng6NotifyPopupComponent, config, document.querySelector('body'));
    else
      this.activeNotificationCompRef = this.compInject.appendComponent(Ng6NotifyPopupComponent, config, document.querySelector(config.location));

    this.activeNotificationCompRef.instance.fade = 'show';

    if (!this.activeNotificationCompRef.instance.sticky) {
      this.cleartime = window.setTimeout(() => {
        this.activeNotificationCompRef.instance.fade = 'hide';
        this.clearhide = window.setTimeout(() => {
          this.destroy();
        }, 700)
      }, config.duration);
    }
    else
      this.activeNotificationCompRef.instance.destroyComponent.subscribe((value) => {
        this.activeNotificationCompRef.instance.fade = 'hide';
        this.clearhide = window.setTimeout(() => {
          this.destroy();
        }, 700)
      });
  }

  private setConfig(configObject: Object, targetObject: NotificationConfig): void {
    const props = Object.getOwnPropertyNames(configObject);
    for (const prop of props) {
      (<any>targetObject)[prop] = (<any>configObject)[prop];
    }

  }
}
