import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnDestroy{

  private _time: number;
  private _timing: number = 1000;
  private _interval;
  private _timeLeft : string
  private _date : number;
  private _id : number;

  @Input()
  public set time(value: string) {
    this._timeLeft = value;
    this._startTimer();
  }

  @Input()
  public set date(value: string | number) {
    this._date = parseInt(value as string, 10);
  }

  @Input()
  public set id(value: string | number) {
    this._id = parseInt(value as string, 10);
  }

  @Input()
  public set timing(value: string | number) {
    this._timing = parseInt(value as string, 10);
    this._startTimer();
  }

  @Input()
  public format: string = '{dd} days {hh} hours {mm} minutes {ss} seconds';

  @Output() timeUp = new EventEmitter();


  public get delta() {
    let currentTime = new Date();
    let actualTime = this._timeLeft.split(':');
    this._time = (+actualTime[0] - currentTime.getHours()) * 60 * 60 + (+actualTime[1] - currentTime.getMinutes()) * 60 + (+actualTime[2] - currentTime.getSeconds());
    if(currentTime.getDate() > this._date){
      this._time = this._time + this._date * 86400;
    }
    else{
      this._time = this._time + (this._date - currentTime.getDate()) * 86400;
    }
    if(this._time<=1){
      this.timeUp.emit({ date: this._date, id : this._id});
    }
    return this._time;
  }

  public get displayTime() {
    let days, hours, minutes, seconds, delta = this.delta, time = this.format;

    days = Math.floor(delta / 86400);
    delta -= days * 86400;
    hours = Math.floor(delta  / 3600) % 24;
    delta -= hours * 3600;
    minutes = Math.floor(delta  / 60) % 60;
    delta -= minutes * 60;
    seconds = delta % 60;
    time = time.replace('{dd}', days);
    time = time.replace('{hh}', hours);
    time = time.replace('{mm}', minutes);
    time = time.replace('{ss}', seconds);

    return time;
  }

  constructor(private _changeDetector: ChangeDetectorRef) { }

  ngOnDestroy() {
    this._stopTimer();
  }

  private _startTimer() {
    if(this.delta <= 1) return;
    this._stopTimer();
    this._interval = setInterval(() => {
      this._changeDetector.detectChanges();
      if(this.delta <= 0) {
        this._stopTimer();
      }
    }, this._timing);
  }

  private _stopTimer() {
    clearInterval(this._interval);
    this._interval = undefined;
  }

}
