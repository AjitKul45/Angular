import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private notificationService: NotificationService) {}

  showSucces(msg: string): void {
    this.notificationService.show({
      content: msg,
      hideAfter: 1000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 2000 },
      type: { style: 'success', icon: true },
    });
  }
  showError(msg: string): void {
    this.notificationService.show({
      content: msg,
      hideAfter: 1000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 1000 },
      type: { style: 'error', icon: true },
      height: 40,
      width: 400,
    });
  }
}
