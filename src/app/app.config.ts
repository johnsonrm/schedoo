import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { environment } from 'src/environments/environment.development';
import { getKey } from './services/appcheck.config.service';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPlugin, NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserState } from './store/states/user.state';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom(
    HttpClientModule,
    HttpClient,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    //TODO: Fix issue with appcheck; get the error "Component app-check has not been registered yet." (this happens even if I paste in the site key directly)
    // provideAppCheck(() => initializeAppCheck(getApp(), {
    //   provider: new ReCaptchaEnterpriseProvider(getKey()),
    //   isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
    // }))

    ),

]
};



