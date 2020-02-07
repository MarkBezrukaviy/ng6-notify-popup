export interface INotificationConfig {
  position?: 'top' | 'bottom';
  duration?: number;
  type?: string;
  location?: string;
  sticky?: boolean;
  text: string;
}
