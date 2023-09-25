
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { inject } from '@angular/core';

export function getKey(): string {
  const http = inject(HttpClient);
  const firebaseReCAPTCHASiteKeyUrl = environment.firebaseReCAPTCHASiteKeyUrl;

  try {

      http.get(firebaseReCAPTCHASiteKeyUrl).subscribe((data) => {
        return data['siteKey'];
      });

  } catch(err) {
    console.log(err);
    // throw new Error('Firebase initialization error');
    return null;
  }
}


