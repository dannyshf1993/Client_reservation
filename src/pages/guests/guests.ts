import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { linkToSegment } from 'ionic-angular/navigation/nav-util';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Observable } from 'rxjs/Rx';



/**
 * Generated class for the GuestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guests',
  templateUrl: 'guests.html',
})
export class GuestsPage {
  list_before_today_reservation: any[];
  tickmin: any;
  list_seated_guests: any[];
  timehour: string;
  total: number;
  listguestnumber: any[];
  guestnumber: any;
  listblength: number;
  listalength: number;
  list_today_reservation_within_an_hour: any[];
  list_after_today_reservation: any[];
  list_today_reservation: any[];
  lists: any[];
  listdate: any[];
  newresultdate: any[];
  list: any[];
  // fourth: any;
  // third: any;
  // second: any;
  // first: any;
  nametoo: any[];
  name(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  val: any;
  vals: any[];
  url: any;
  firedata = firebase.database().ref('/reservedDate');
  reservedguestsname: {};
  res: any;
  displayReservedhour: any;
  displayGuestsname: string;
  displayGuestsnumber: string;
  hours: any;
  Reserved_restaurant_name: string;
  Reserved_Date_hour: string;
  displayName: string;
  uid: string;
  myDate: String = new Date().toISOString();
  rangeSettings: number = 3600;
  // daterange: String = new Date().getTime();
  menulists: FirebaseListObservable<any[]>;
  restaurantsname: FirebaseListObservable<any[]>;
  reservedguestsnumber: FirebaseListObservable<any[]>;

  reservedDate: FirebaseListObservable<any[]>;

  testCheckboxResult: any;
  testCheckboxOpen: boolean;
  songs: FirebaseListObservable<any>;
  restaurantsone: FirebaseListObservable<any>;

  private tick: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userservice: UserProvider,
    public zone: NgZone,
    public afd: AngularFireDatabase,
    public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider) {
    this.reservedDate = this.afd.list('/reservedDate', { preserveSnapshot: true });

  }

  ionViewDidLoad() {

    this.loaduserdetails();
  }

  onCountdown() {

    //   let timer = TimerObservable.create(2000, 1000).subscribe(t => { this.tick = t; });

    let timer = Observable.timer(0, 1000)
      .map(value => (3600 - value))
      .takeWhile(value => value > 0)
      .subscribe(t =>
        this.tick = t

      );

  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {

      this.Reserved_restaurant_name = res.Reserved_restaurant_name;
      this.vals = Object.keys(res.photoURL).map(function (key) {
        return res.photoURL[key];
      });

      ////////////////////////////////////////
      Date.prototype.toISOString = function () {
        var tzo = -this.getTimezoneOffset(),
          dif = tzo >= 0 ? '+' : '-',
          pad = function (num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
          };
        return this.getFullYear() +
          '-' + pad(this.getMonth() + 1) +
          '-' + pad(this.getDate()) +
          'T' + pad(this.getHours()) +
          ':' + pad(this.getMinutes()) +
          ':' + pad(this.getSeconds()) +
          dif + pad(tzo / 60) +
          ':' + pad(tzo % 60);
      }

      var dt = new Date();

      // console.log(dt.toISOString());
      // //[18:48]
      // console.log(dt.toISOString().substring(11, 16));
      // //[18]
      // console.log(dt.toISOString().substring(11, 13));


      var objArray = this.vals;
      objArray.sort(function (a, b) {
        return new Date(a.Reserved_Date).getTime() - new Date(b.Reserved_Date).getTime() || a.Reserved_Date_hour.localeCompare(b.Reserved_Date_hour);
      });

      var list = [];
      for (var i = 0; i < this.vals.length + 1; i++) {
        this.list = list;

        list = objArray;
      }

      // console.log(this.list);

      /////////////////////////////////////////////seperate reservation according to the date of reservation(today & after today)
      var lista = [];
      var listb = [];

      var listaa = [];
      var listguestnumber = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date === dt.toISOString().substring(0, 10)) {

          lista.push(this.vals[i]);
          this.list_today_reservation = lista;
          this.timehour = dt.toISOString().substring(11, 16);
          // 11: 30 < 22: 00 && 21: 00 < 22: 00 output only 21: 00
          //for seated guest section (one hour interval)

          // if (this.vals[i].Reserved_Date_hour < dt.toISOString().substring(11, 16) && +this.vals[i].Reserved_Date_hour.substring(0, 2) > +dt.toISOString().substring(11, 13) - 2) {

          //   listaa.push(this.vals[i]);
          //   this.list_seated_guests = listaa;

          //   // let timer = TimerObservable.create(1000, 1000).subscribe(t => {
          //   //   this.tick = t;
          //   // });
          //   this.guestnumber = lista[i].Reserved_Guests_number.substring(0, 1);
          //   this.listguestnumber = listguestnumber;
          //   listguestnumber.push(this.guestnumber);
          // } else {
          
            
          // }
        } else if (this.vals[i].Reserved_Date > dt.toISOString().substring(0, 10)) {

          listb.push(this.vals[i]);
          this.list_after_today_reservation = listb;
        } 
      }
      this.listalength = lista.length;
      this.listblength = listb.length;

      var total = 0;
      for (var i = 0; i < this.listguestnumber.length; i++) {
        total += +this.listguestnumber[i];
      }

      this.total = total;

      var date = new Date().toISOString().substring(0, 10);

      var time = [];
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].Reserved_Date === date) {
          time.push(this.list[i].Reserved_Date);

        }
      }


    })
  }

}
