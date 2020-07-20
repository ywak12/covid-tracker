import { Injectable, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject , fromEvent,  AsyncSubject, Subject, Observable, ConnectableObservable } from 'rxjs';
import { map, tap, startWith, pairwise, share, publish, filter, exhaustMap, multicast, isEmpty } from 'rxjs/operators';

/** 
 * Listens to scrolling event within mat-side-nav content (when windows:scroll isn't available)
*/

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
};

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

@Injectable({
  providedIn: 'root'     //make ContentScrollListenerService a singleton
})
export class ContentScrollListenerService {

  private sidenavContentElem;
  private contentScrollEventSubject = new Subject(); // observes observable sequences
  private multicast;
  private subscriptions = [];

  @Input() public scrollCallback;
  @Input() public testInput: string;

  constructor(@Inject(DOCUMENT) private document: Document) 
  {

  }

  /** 
   * Should be initialized once by component that hosts mat-sidenav-content (app.component.html)
  */
  public startListeningToScrolling() {

    //Method 1: Subject, register Scroll Event on sidenav-content
    this.sidenavContentElem = this.document.querySelector('mat-sidenav-content');
    this.document.querySelector('mat-sidenav-content')
                                 .addEventListener('scroll', this.onContentScroll.bind(this));

    //Method 2, Multicast Observable: Register Scroll Event
    this.multicast = fromEvent(this.sidenavContentElem, 'scroll');
  }

  public getScrollEventSubject() {
    if(this.contentScrollEventSubject == undefined) {
      this.startListeningToScrolling();
    }

    return this.contentScrollEventSubject;
  }

  public getMulticast(caller: String) {
    return this.multicast;
  }


  public onContentScroll(e) {
    this.contentScrollEventSubject.next(e);
  }
}