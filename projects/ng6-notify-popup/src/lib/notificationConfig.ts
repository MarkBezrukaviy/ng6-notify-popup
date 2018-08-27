export class NotificationConfig {
  position: string;
  duration: number;
  type: string;
  location: string;
  sticky: boolean;
  notifyText: string;
  constructor(position: string, duration: number, type: string, location: string, sticky: boolean, notifyText: string) {
    this.position = position;
    this.duration = duration;
    this.type = type;
    this.location = location;
    this.sticky = sticky;
    this.notifyText = notifyText;
  }
}
