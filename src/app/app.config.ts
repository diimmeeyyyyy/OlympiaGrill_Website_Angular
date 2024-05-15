import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'olympiagrill-2d6e0',
          appId: '1:133251309220:web:782555ae803229a6c81031',
          storageBucket: 'olympiagrill-2d6e0.appspot.com',
          apiKey: 'AIzaSyCwFMH3odRyKK5pTR7sxbdL8qpNqA9f-qY',
          authDomain: 'olympiagrill-2d6e0.firebaseapp.com',
          messagingSenderId: '133251309220',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
