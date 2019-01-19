import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
//{ path: '', component: Component },
{ path: 'join', component: AuthComponent },
{ path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
