import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ngx-notify',
  template: `
    <div [@shrinkOut]="fade" class="trb-notify {{'trb-' + type}}"
         [ngClass]="{
            'trb-top': position=== 'top',
            'trb-bottom': position === 'bottom',
            'trb-fixed': location === 'body',
            'trb-absolute': location !== 'body',
            'trb-sticky': sticky
         }">
      <span class="trb-message">{{text}}</span>
      <span class="trb-dismiss" (click)="dismiss()">×</span>
    </div>`,
  styleUrls: ['ngx-notify-popup.css'],
  animations: [
    trigger('shrinkOut', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('* => show', animate('700ms ease-out'))
    ])
  ]
})
export class NgxNotifyPopupComponent {
  @Input() position: string;
  @Input() duration: number;
  @Input() type: string;
  @Input() text: string;
  @Input() fade: string;
  @Input() sticky: boolean;
  @Input() location: string;
  @Output() destroyComponent = new EventEmitter<boolean>();

  public dismiss(): void {
    this.destroyComponent.emit(true);
  }
}
