import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";


@Injectable({
    providedIn : 'root',
})
export class WebSocketShareService implements OnDestroy {

    private blogDataSubject = new BehaviorSubject<string>(undefined);

    constructor() { }
    ngOnDestroy(): void {
        this.blogDataSubject .unsubscribe();
    }
    
    onNewValueReceive(msg: string) {        
        this.blogDataSubject .next(msg);
    }

    getNewValue(): Observable<string> {
        return this.blogDataSubject .asObservable();
    }
}