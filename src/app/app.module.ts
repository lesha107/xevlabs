import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseModule } from './modules/firebase.module';
import { SharedModule } from './modules/shared.module';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { FORMLY_CONFIGS } from './configs/formly.configs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FirebaseModule,
    AppRoutingModule,
    SharedModule,
    FormlyModule.forRoot(FORMLY_CONFIGS),
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
