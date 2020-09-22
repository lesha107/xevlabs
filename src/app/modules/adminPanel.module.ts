import { NgModule } from '@angular/core';
import { AdminPanelComponent } from '../pages/admin-panel/admin-panel.component';
import { AdminPanelRoutingModule } from '../pages/admin-panel/admin-panel-routing.module';
import { SharedModule } from './shared.module';
import { FirebaseModule } from './firebase.module';
import { DialogComponent } from '../components/dialog/dialog.component';
export const ADMIN_DECLARATIONS = [AdminPanelComponent, DialogComponent];
export const ADMIN_IMPORTS = [
  SharedModule,
  FirebaseModule,
  AdminPanelRoutingModule,
];

@NgModule({
  declarations: ADMIN_DECLARATIONS,
  imports: ADMIN_IMPORTS,
})
export class AdminPanelModule {}
