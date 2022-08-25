import { Injectable } from '@angular/core';
import { NavController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppUtilService {

  public actionInprogress: number;

  public progressIndicator: any;

  constructor(
    private statusBar: StatusBar,
    private faio: FingerprintAIO,
    private screenOrientation: ScreenOrientation,
    private platform: Platform) {

  }

  public async startAction(loadCtrl: LoadingController, message: any) {
    this.actionInprogress++;

    this.progressIndicator = await loadCtrl.create({
        duration: 1000,
        message: message.content?message.content:'Please Wait...',
        translucent: true,
        cssClass: 'custom-loading',
        showBackdrop: true,
        mode: 'md',
        keyboardClose: true
      });
      return await this.progressIndicator.present();
}

public stopAction() {

    this.actionInprogress--;
    if (this.progressIndicator) {
        this.progressIndicator.dismiss();
    }
}

public startStopToast(toastCtrl: ToastController, message: string) {
    const toast = toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom'
    });
    // toast.present();
}

public lockScreen(oriantation:any){
  if(this.platform.is('cordova')){
    this.platform.ready().then(()=>{
      this.screenOrientation.lock(oriantation);
    })
  }
  
}

public unlockScreen(){
  if(this.platform.is('cordova')){
    this.platform.ready().then(()=>{
      this.screenOrientation.unlock();
    })
  }
  
}

setPrimaryBgStatusBar(){
  this.statusBar.backgroundColorByHexString('#0eb68f');
  this.statusBar.styleLightContent();
}

setSecondaryBgStatusBar(){
  this.statusBar.backgroundColorByHexString('#ff7760');
  this.statusBar.styleLightContent();
}

setWhiteBgStatusBar(){
  this.statusBar.backgroundColorByHexString('#ffffff');
  this.statusBar.styleDefault();
}

setblurBgStatusBar(){
  this.statusBar.backgroundColorByHexString('#f0e1ce');
  this.statusBar.styleDefault();
}

presentFingerPrint() { 
  let options: FingerprintOptions;
  options.cancelButtonTitle = 'Cancel';
  options.description = 'Please authenticate';
  options.fallbackButtonTitle = 'User Backup';
  options.subtitle = 'Coolest Plugin ever';
  options.title = 'Biometric Authentication';
  options.disableBackup = true;
        return this.faio.show(
          options);
}

isFingerprintAvailable() { 
        let result=false;
        const promise = this.faio.isAvailable(); 
        promise.then((response) => {
            result = true;
              alert('fingerprint available : ' + response);
        });
        promise.catch((error) => {
        result=false;
        alert('fingerprint error : ' + error);
        });

    return result;
}

// openLoginBottomSheet(): MatBottomSheetRef {
//   return this.bottomSheet.open(LoginSheetComponent, {
//     data: {courseId:''}
//   });
// }

}
