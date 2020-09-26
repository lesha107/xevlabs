import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseModule } from './modules/firebase.module';
import { SharedModule } from './modules/shared.module';
<<<<<<< HEAD
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { FORMLY_CONFIGS } from './configs/formly.configs';
=======
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './modules/auth.module';
>>>>>>> 441e249b5f34f0d1aa566474afb6cda23c7f94b2

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FirebaseModule,
    AppRoutingModule,
    SharedModule,
<<<<<<< HEAD
    FormlyModule.forRoot(FORMLY_CONFIGS),
=======
    AuthModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
>>>>>>> 441e249b5f34f0d1aa566474afb6cda23c7f94b2
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
