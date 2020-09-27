import { NgModule } from '@angular/core';
import { ToastContainerModule } from 'ngx-toastr';
import { AuthRoutingModule } from '../pages/auth/auth-routing.module';
import { AuthComponent } from '../pages/auth/auth.component';
import { FirebaseModule } from './firebase.module';
import { SharedModule } from './shared.module';

export const AUTH_DECLARATIONS = [AuthComponent];
export const AUTH_IMPORTS = [
  SharedModule,
  FirebaseModule,
  AuthRoutingModule,
  ToastContainerModule,
];

@NgModule({
  declarations: AUTH_DECLARATIONS,
  imports: AUTH_IMPORTS,
})
export class AuthModule {}
