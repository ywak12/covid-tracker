import { Component, AfterViewInit, Input, EventEmitter, Inject, ElementRef, ViewChild} from '@angular/core';
import { ToggleService } from '../../shared/services/toggle.service';
import { ThemeService } from '../../shared/services/theme.service';
import { ContentScrollListenerService } from '../../shared/services/contentscrolllistener.service';
import { slideDownFadeIn, fadeIn } from '../../shared/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideDownFadeIn, fadeIn]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('headerToolbar', {static:false, read: ElementRef}) private matToolbarElem: ElementRef;
  private scrollSubscription;

  constructor(private toggleService: ToggleService,
              private themeService : ThemeService,
              private contentScrollService: ContentScrollListenerService,
              private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit() {
    this.contentScrollService.startListeningToScrolling();
    this.scrollSubscription = this.contentScrollService.getScrollEventSubject().subscribe(scrollEvent => { this.onContentScroll2(scrollEvent) });
    this.document.body.addEventListener('scroll', this.onContentScroll2.bind(this));
  }

  toggleActive:boolean = false;

  toggleSidenav() {
    this.toggleService.toggle();
  }

  toggleNightmode() {
    this.themeService.toggleTheme();
  }


  //SECTION
  @Input() public index: number;
  public isElevated: boolean = false;
  public switchedOn :boolean = true;
  public elevationValue = 0

  onContentScroll2(event) {    
    if( event.target.scrollTop > this.matToolbarElem.nativeElement.clientHeight) 
    {
      if(this.isElevated) {
        this.isElevated = false;
      }

      this.isElevated = true;
      this.elevationValue = 4;
      
    }
    else {
      this.isElevated = false;
      this.elevationValue = 0;
    }
  }
}
