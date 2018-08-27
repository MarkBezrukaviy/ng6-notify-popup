import { ModuleWithProviders, NgModule } from '@angular/core';
import { Ng6NotifyPopupComponent } from './ng6-notify-popup.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentInjectService } from './services/component-inject.service';
import { Ng6NotifyPopupService } from './services/ng6-notify-popup.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    Ng6NotifyPopupComponent
  ],
  providers: [
    ComponentInjectService
  ],
  entryComponents: [
    Ng6NotifyPopupComponent
  ]
})
export class Ng6NotifyPopupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng6NotifyPopupModule,
      providers: [
        Ng6NotifyPopupService,
        ComponentInjectService
      ]
    };
  }
}
