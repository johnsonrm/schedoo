import { ApplicationConfig, importProvidersFrom, Injector, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp, getApp, FirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { environment } from 'src/environments/environment.development';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPlugin, NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserState } from './store/states/user.state';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      HttpClient,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAnalytics(() => getAnalytics()),
      provideAuth(() => getAuth()),
      // TODO:  This doesn't work; "main.ts:8  Error: Component app-check has not been registered yet"
      // provideAppCheck(() => initializeAppCheck(getApp(), {
      //   provider: new ReCaptchaEnterpriseProvider(""),
      //   isTokenAutoRefreshEnabled: true,
      // })),
      NgxsModule.forRoot([UserState]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      )
]
};

