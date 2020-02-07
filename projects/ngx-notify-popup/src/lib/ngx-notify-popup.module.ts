import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxNotifyPopupComponent } from './ngx-notify-popup.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentInjectService } from './services/component-inject.service';
import { NgxNotifyPopupService } from './services/ngx-notify-popup.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NgxNotifyPopupComponent
  ],
  providers: [
    ComponentInjectService
  ],
  entryComponents: [
    NgxNotifyPopupComponent
  ]
})
export class NgxNotifyPopupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxNotifyPopupModule,
      providers: [
        NgxNotifyPopupService,
        ComponentInjectService
      ]
    };
  }
}
