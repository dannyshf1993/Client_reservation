import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from "angularfire2/database";
import { GuestsPage } from '../pages/guests/guests';
import { ReportPage } from '../pages/report/report';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user/user';
import { SignupPage } from '../pages/signup/signup';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { ProfilePage } from '../pages/profile/profile';

// export const firebaseConfig = {
//   apiKey: "AIzaSyCHD1grYSw_D99Db0hfaeX_PEdpXPYg5PI",
//   authDomain: "testproject-170706.firebaseapp.com",
//   databaseURL: "https://testproject-170706.firebaseio.com",
//   projectId: "testproject-170706",
//   storageBucket: "testproject-170706.appspot.com",
//   messagingSenderId: "265518265966"
// };

export const firebaseConfig = {
  apiKey: "AIzaSyCHD1grYSw_D99Db0hfaeX_PEdpXPYg5PI",
  authDomain: "testproject-170706.firebaseapp.com",
  databaseURL: "https://testproject-170706.firebaseio.com",
  projectId: "testproject-170706",
  storageBucket: "testproject-170706.appspot.com",
  messagingSenderId: "265518265966"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ReportPage,
    GuestsPage,
    LoginPage,
    SignupPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ReportPage,
    GuestsPage,
    LoginPage,
    SignupPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AuthProvider,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ImghandlerProvider,
    FileChooser
  ]
})
export class AppModule {}
