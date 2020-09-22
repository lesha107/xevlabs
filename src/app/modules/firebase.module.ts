import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  AngularFireRemoteConfigModule,
  SETTINGS,
} from '@angular/fire/remote-config';
import {
  AngularFireAnalyticsModule,
  CONFIG,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import {
  AngularFirePerformanceModule,
  PerformanceMonitoringService,
} from '@angular/fire/performance';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(), // this enable offline persistence
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireRemoteConfigModule,
    AngularFireMessagingModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
  ],
  providers: [
    AngularFireFunctionsModule,
    ScreenTrackingService,
    UserTrackingService,
    PerformanceMonitoringService,
    {
      provide: CONFIG,
      useValue: {
        send_page_view: true,
        allow_ad_personalization_signals: false,
        anonymize_ip: false,
        enableAwesome: true,
      },
    },
    {
      provide: SETTINGS,
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {},
    },
  ],
})
export class FirebaseModule {}
