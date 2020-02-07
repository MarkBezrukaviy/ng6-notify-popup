# ngx-notify-popup
##### for Angular 9.x.
Based on
- [ ng2-notify-popup ](https://github.com/shubhi1407/ng2-notify-popup) for Angular 4.x by Shubhangi Gupta
- [ ng-notify ](https://matowens.github.io/ng-notify/) for Angular 1.x by Mat Owens

## [ View Demo - still Angular 9 version ](https://shubhi1407.github.io/ng2-notify-popup/)

## Installation

```bash
$ npm install --save ngx-notify-popup
```
## Usage
`AppModule`:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

/** IMPORTANT : IE10 and IE11 requires the following to support `@angular/animation` (which is used by this module).
Run `npm install --save web-animations-js`.
*/
import 'web-animations-js';  

// Import library
import { NgxNotifyPopupModule } from 'ngx-notify-popup';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Add module to imports
    NgxNotifyPopupModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its Notification service

```typescript
// You can now use this library service to show popup anywhere in angular app
import { Component } from '@angular/core';
import { NgxNotifyPopupService } from 'ngx-notify-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgxNotifyPopupService]
})
export class AppComponent {

  constructor(private notify: NgxNotifyPopupService) { }

  // to append in body
  show(text: string, type: string): void {
    this.notify.show(text, { position:'top', duration:'2000', type: 'success' });
  }
  // to append in any other component.
  showModular(text: string, type: string): void {
    this.notify.show(text, { position:'top', duration:'2000', type: 'success', location: '#modular' });
  }

```
## API
### NgxNotifyPopupService.setConfig( options: object )
This method can be used to override the default configuration provided by the module. All params are optinal
```typescript
NgxNotifyPopupService.setConfig({
                                position: 'top/bottom',
                                type: 'info/success/warn/error/grimace/default',
                                duration: 4000,
                                sticky: true/false,
                             })
```
### NgxNotifyPopupService.show( text: string, options?: object )
`show()` method can be called with an optional second argument to override the global default config
```typescript
// Simple notification
NgxNotifyPopupService.show("Success");
// Notification with options
NgxNotifyPopupService.show("Error occured", { position: 'top', type: 'error' })
//Show notification inside a division (MUST have position:relative)
NgxNotifyPopupService.show("Inside a div", { location: '#my-div' })
```
### NgxNotifyPopupService.destroy()
```typescript
// Destroy any active notification
NgxNotifyPopupService.destroy();
```

## Custom type
You can create your own `type` in CSS as follows
```CSS
.trb-wild {
  background-color: #f4a460;
  }
```
## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License
MIT © [Mark Bezrukaviy](mailto:mark.bezrukaviy@gmail.com)
MIT © [Shubhangi Gupta](mailto:shubhangi140793@gmail.com)
