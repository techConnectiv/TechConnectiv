import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  @Output()
  event: EventEmitter<any> = new EventEmitter<any>(true);

  constructor() { }

  public show() {
    this.event.emit(true);
  }
  
  public hide() {
    this.event.emit(false);
  }

}
