import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({ providedIn: 'root' })
export class YeaNotificationService {

  constructor(
                private localNotifications: LocalNotifications
              ) {

              }
              single_notification(message: string) {
                // Schedule a single notification
                this.localNotifications.schedule({
                  id: Math.floor(Math.random() * 9999),
                  text: message,
                  sound: 'file://sound.mp3',
                  foreground : true,
                  launch: true,
                  smallIcon: "res://my_notification_icon",
                  attachments: ['https://atlas-content-cdn.pixelsquid.com/stock-images/golden-soccer-ball-3yLR9z1-600.jpg'],
                  lockscreen: true,
                  icon: 'res://my_notification_icon',
                  led: { color: '#FF00ff', on: 500, off: 500 },
                  data: { secret: 'key_data' }
                });
              }
            
            
              multi_notification() {
                // Schedule multiple notifications
                this.localNotifications.schedule([{
                  id: 1,
                  text: 'Multi ILocalNotification 1',
                  sound: 'file://sound.mp3',
                  data: { secret: 'key_data' }
                }, {
                  id: 2,
                  title: 'Local ILocalNotification Example',
                  text: 'Multi ILocalNotification 2',
                  icon: 'http://example.com/icon.png'
                }]);
              }
            
            
            
              delayed_notification() {
                // Schedule delayed notification
                this.localNotifications.schedule({
                  text: 'Delayed ILocalNotification',
                  trigger: { at: new Date(new Date().getTime() + 3600) },
                  led: 'FF0000',
                  sound: null
                });
              }
            
}
