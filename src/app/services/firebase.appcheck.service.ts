import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ReCaptchaEnterpriseProvider, initializeAppCheck, AppCheck } from '@angular/fire/app-check';
import { getApp } from '@angular/fire/app';


// TODO: This doesn't work and may not be needed, if I can ever figure out how to get AppCheck working with AngularFire.
@Injectable({
  providedIn: 'root',
})
export class FirebaseAppCheckService {
  private appCheck: AppCheck | null = null;

  constructor(private http: HttpClient) {
    this.getKey().then(siteKey => {
      this.appCheck = initializeAppCheck(getApp(), {
        provider: new ReCaptchaEnterpriseProvider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    });
  }

  getAppCheck(): AppCheck | null {
    return this.appCheck;
  }

  getKey(): Promise<string> {
    const firebaseReCAPTCHASiteKeyUrl = environment.firebaseReCAPTCHASiteKeyUrl;

    return new Promise((resolve, reject) => {
      this.http.get(firebaseReCAPTCHASiteKeyUrl).subscribe(
        (data) => {
          resolve(data['siteKey']);
        },
        (error) => {
          console.error('Failed to get ReCAPTCHA Site Key for Firebase AppCheck.', error);
          reject(new Error('Failed to get ReCAPTCHA Site Key for Firebase AppCheck.'));
        }
      );
    });
  }

}
