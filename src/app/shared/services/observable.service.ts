import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ObserverArrayItem{
  key: string;
  observable: BehaviorSubject<any>;
}

@Injectable()
export class ObservableService {
  private observerArray: ObserverArrayItem[] = [];


  createObservable(key: string) {
    const observable = new BehaviorSubject(null);
    this.observerArray.push({ key, observable });
  }


  getObservable(key: string) {
    const observableArrayItem = this.observerArray.find(obs => obs.key === key);
    return observableArrayItem ? observableArrayItem.observable : null;
  }


  emitValue(key: string, data: any) {
    const observableArrayItem = this.observerArray.find(obs => obs.key === key);
    if (observableArrayItem)
      observableArrayItem.observable.next(data);
  }


  destroyObservable(key: string) {
    const selectedObservable = this.observerArray.find(obs => obs.key === key);
    if (selectedObservable)
      selectedObservable.observable.unsubscribe();
    this.observerArray = this.observerArray.filter(obs => obs.key !== key);
  }
}
