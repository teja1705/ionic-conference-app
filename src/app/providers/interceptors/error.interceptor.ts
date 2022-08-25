import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromActions from '../../store/prediction.action';
import * as fromReducers from '../../store/prediction.reducer';
import * as fromPredictionState from '../../store/prediction.state';
import { ToastControllerService } from '../toast-controller.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private store: Store<fromPredictionState.PredictionState>,
        private _injector: Injector,
        private toastCtrlService : ToastControllerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {
            switch (err.status) {
                case 400:
                    // location.reload(true);
                    
                    // this.notificationService.showNotification(err.error.title);
                    if(err.error.errorKey === 'bio-profile does not exists'){
                       this.store.dispatch(fromActions.ClearProgressAction());

                    //    let sheetRef =  this.bottomSheet.open(BioProfileComponent, {
                    //     data: {}
                    //   });
                    //   sheetRef.disableClose = true;
                    //   sheetRef.afterDismissed().subscribe( data => {
                    //       
                    //       if(data.close){
                    //         this.router.navigate(['/app-home/home']);
                    //       }
                        // this.appUtilService.setPrimaryBgStatusBar();
                  
                    //   });
                        this.router.navigate(['/bio-profile'])

                    //    this._dialogBioProfileService.presentModal();
                    }else{
                        this.toastCtrlService.toastMessage(err.error.title + ' Please use Different',
                        2000, 'danger');
                       this.store.dispatch(fromActions.ClearProgressAction());
                    }
                    break;
                case 401:
                    // location.reload(true);
                    this.toastCtrlService.toastMessage(err.error.detail + ' Please check',
                    2000, 'danger');
                    this.store.dispatch(fromActions.ClearProgressAction());

                    // this.notificationService.showNotification('Un Authorized User.');
                    break;
                case 404:
                        const router = this._injector.get(Router);
                        // router.navigate(['/404']);
                    break;
                case 500:
                    this.store.dispatch(fromActions.ClearProgressAction());
                    break;
                }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
