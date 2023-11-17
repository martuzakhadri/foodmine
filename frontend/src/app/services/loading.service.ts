import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
private isloadingSubject = new BehaviorSubject<boolean>(false)
  constructor() { }

showloading(){
  this.isloadingSubject.next(true)
}
hideloading(){
  this.isloadingSubject.next(false);
}


get isloading(){
  return this.isloadingSubject.asObservable();
}

}
