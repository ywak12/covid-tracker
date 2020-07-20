import { Directive, HostListener, ElementRef, ViewChild, Input, AfterViewInit, Output, Inject, EventEmitter, OnInit, OnDestroy, SystemJsNgModuleLoader} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { revealOnScrollAnimation } from '../animations';


/**
 * 
 * Listens to either window/body or mat-sidenav-content depending on which scrollbar is visible
 * 
 * Assumes only one mat-sidenav-content used within the application.
 */

@Directive({
  selector: '[revealOnScroll]'
})
export class RevealonscrollDirective implements OnInit, AfterViewInit, OnDestroy {

  public windowWidth: string;
  public win_height_padded: number;
  public switchedOn : boolean = true;
  private posY;

  private scrollElementRef : Element;

  private elementView;
  private windowHeight;

  private timer;

  @Input() public index: number;
  @Output() public showSection: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
      this.scrollElementRef = this.document.body;


    this.document.querySelector('mat-sidenav-content').addEventListener('scroll', this.onContentScroll.bind(this));
    this.scrollElementRef.addEventListener('scroll', this.onContentScroll.bind(this));
  }

  ngAfterViewInit() {
    this.elementView = this.elementRef.nativeElement.getBoundingClientRect();
    this.posY = this.getYPosition(this.elementRef);
    this.windowHeight = window.innerHeight;

    this.showSection.emit({
       "index": this.index,
       "state": false
     });
  }

  ngOnDestroy() {
    //unsubscribe (prevent memory leak)
    this.scrollElementRef.removeEventListener('scroll', this.onContentScroll);
  }

  onContentScroll(event) {   
    if(this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(function() {
      }, 1000);
        
    //activate event when scrolled to its designated element
    if( (this.scrollElementRef.scrollTop + this.scrollElementRef.clientHeight) >= (this.posY + 150 + 36) ) {  // verticalY + padding + h1.height
      if(this.switchedOn) {
        this.switchedOn = false;
      }

      this.showSection.emit({
        "index": this.index,
        "state": true
      });
    }
  }

  /**
   * determine element's Y position
   */
  getYPosition(el:ElementRef){
    let offsetTop = 0;

    let nativeElement = el.nativeElement;

    while(nativeElement){
        offsetTop += nativeElement.offsetTop;
        nativeElement = nativeElement.offsetParent;
    }
    
    return offsetTop;
  }
}
