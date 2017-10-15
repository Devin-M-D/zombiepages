import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import {
  HeaderComponent,
  SharedModule,
  ApiService,
  ZombieService
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash: true})

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    rootRouting
  ],
  providers: [
    ApiService,
    ZombieService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
