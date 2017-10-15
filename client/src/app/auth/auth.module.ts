import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { AuthComponent } from './auth.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'join',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    authRouting,
    SharedModule
  ],
  providers: []
})
export class AuthModule { }
