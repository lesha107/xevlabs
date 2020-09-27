import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SHARED_COMPONENTS } from '../components/shared';
import { FirebaseModule } from './firebase.module';
export const SHARED_IMPORTS = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  FirebaseModule,
  MaterialModule,
  FormlyModule,
  FormlyMaterialModule,
  MatNativeDateModule,
  FormlyMatDatepickerModule,
];
export const SHARED_DECLARATIONS = [...SHARED_COMPONENTS];
export const SHARED_EXPORTS = [...SHARED_IMPORTS, ...SHARED_DECLARATIONS];
export const SHARED_PROVIDERS = [];

@NgModule({
  declarations: SHARED_DECLARATIONS,
  imports: SHARED_IMPORTS,
  exports: SHARED_EXPORTS,
  providers: SHARED_PROVIDERS,
})
export class SharedModule {}
