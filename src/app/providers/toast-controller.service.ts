import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({ providedIn: 'root' })
export class ToastControllerService {

    constructor(private toastCtrl : ToastController){}

    async toastMessage(msg, dur, col){
        const toast = this.toastCtrl.create({
            message: msg,
            duration: dur,
            position : 'top',
            color : col
          });
          (await toast).present();
    }
}