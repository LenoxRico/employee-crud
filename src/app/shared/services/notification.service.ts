import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationComponent } from '../components';

@Injectable()
export class NotificationService {

  private duration = 3000;
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message, success) {
    const messageValue = message.error ? message.error[0].message : message;
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.duration,
      data: { messageValue, success },
      panelClass: [success ? 'success-snackbar' : 'error-snackbar']
    });
  }
}
