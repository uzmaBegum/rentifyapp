import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface msg {
  type:string, //error,success
  text:string, //msg
  duration:number, //msg duration
  state:boolean // show and hide
}
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSubject = new BehaviorSubject<any>('');
  message$ = this.messageSubject.asObservable();
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  showMsg(message: msg) {
    this.messageSubject.next(message);
  }
  toggleLoader(value: boolean) {
    this.loaderSubject.next(value);
  }
}
