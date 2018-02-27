import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";// import { linkToSegment } from 'ionic-angular/navigation/nav-util';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menulists: FirebaseListObservable<any[]>;
  restaurantsname: FirebaseListObservable<any[]>;
  reservedguestsnumber: FirebaseListObservable<any[]>;
  
  reservedDate: FirebaseListObservable<any[]>;
  
  testCheckboxResult: any;
  testCheckboxOpen: boolean;
  songs: FirebaseListObservable<any>;
  restaurantsone: FirebaseListObservable<any>;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public afd: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    // public userservice: UserProvider
  ) {
    this.songs = this.afd.list('/customerinformation');
    this.restaurantsone = this.afd.list('/restaurantsone');
    this.reservedguestsnumber = this.afd.list('/reservedguestsnumber');
    this.restaurantsname = this.afd.list('/restaurantsname');
    this.menulists = this.afd.list('/menulists');
    this.reservedDate = this.afd.list('/reservedDate');
    
    }
  
    // ionViewWillEnter() {
    //   this.loaduserdetails();
    // }
  
    // loaduserdetails() {
    //   this.userservice.getuserdetails().then((res: any) => {
    //     this.displayName = res.displayName;
    //   })
    // }

  

  }
