import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material.module'
import { HeaderComponent } from './core/header/header.component';
import { AppRouterModule } from './app-router.module';

import { CommonModule } from '@angular/common';
import { OverlayModule} from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CovidTrackerModule} from './modules/covid-tracker/covid-tracker.module'
import { FooterComponent } from './core/footer/footer.component';  //needed to inject scrolling inside sidenav-content



@NgModule({
  declarations: [                  //define all components, directives, and pipes used here
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [                       //define list of submodules used here
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    AppRouterModule,
    AngularMaterialModule,
    CovidTrackerModule,
    FlexLayoutModule,
    ScrollingModule,
    OverlayModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
