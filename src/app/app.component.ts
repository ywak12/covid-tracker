import { Component, HostBinding, OnInit, OnDestroy, ViewChild, Inject, ChangeDetectorRef} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ContentScrollListenerService } from './shared/services/contentscrolllistener.service';
import { ThemeService } from './shared/services/theme.service';
import { ToggleService } from './shared/services/toggle.service';;
import { DOCUMENT } from '@angular/common';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('class') componentCssClass;

  title = 'app';

  public contentHeight: number;
  public routerHeight: number;
  private appTheme: string;

  @ViewChild('drawer', { static: true })
  public sidenav: MatSidenav;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public themeService : ThemeService,
              private toggleService: ToggleService,
              private scrollListenerService: ContentScrollListenerService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              @Inject(DOCUMENT) private document: Document,
              private router: Router,
              private overlayContainer: OverlayContainer,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    //register icons
    this.matIconRegistry.addSvgIcon ( 'masks', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/masks-black-24dp.svg'));
    this.matIconRegistry.addSvgIcon ( 'coronavirus', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/coronavirus-black-24dp.svg'));
  }

  ngOnInit(): void {
    //Register Theme
    this.themeService.currentTheme.subscribe(theme => { 
      if(theme == "light-theme") {
        this.overlayContainer.getContainerElement().classList.remove("dark-theme");
      }
      else if(theme == "dark-theme") {
        this.overlayContainer.getContainerElement().classList.remove("dark-theme");
      } 
      this.overlayContainer.getContainerElement().classList.add(theme);   //apply theme for dialogs
      this.componentCssClass = theme; 
    });

    //Register current sidenav to toggleService
    this.toggleService.setSidenav(this.sidenav);

    //Set Dynamically set Height of content based on screen sizes
    if(document.documentElement.clientHeight >= 600) {                  //Desktop Screen
      this.contentHeight = document.documentElement.clientHeight - 64;
    }
    else {                                                              //Mobile Screen
      this.contentHeight = document.documentElement.clientHeight - 56;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /*
    Get currently active route page
    @outlet: router outlet
  */
  getPage(outletContent) {
    // Changing the activatedRouteData.state triggers the animation
    let output = outletContent.isActivated ? outletContent.activatedRoute : '';
    return outletContent.activatedRouteData['page'] || 'content';

  }

  /*
    Callback when route transition animation starts
    @event: animation event
  */
  routeTransitionStarted(event) {

  }

  /*
    Callback when route transition animation ends
    @event: animation event
  */
  routeTransitionDone(event) {
    
  }

}
