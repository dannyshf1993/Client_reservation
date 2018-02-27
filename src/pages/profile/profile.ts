import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
// import { linkToSegment } from 'ionic-angular/navigation/nav-util';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  number: any;
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
  avatar: string;
  displayName: string;
  uid: string;
  myDate: String = new Date().toISOString();

  menulists: FirebaseListObservable<any[]>;
  restaurantsname: FirebaseListObservable<any[]>;
  reservedguestsnumber: FirebaseListObservable<any[]>;

  reservedDate: FirebaseListObservable<any[]>;

  testCheckboxResult: any;
  testCheckboxOpen: boolean;
  songs: FirebaseListObservable<any>;
  restaurantsone: FirebaseListObservable<any>;

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

  // ionViewWillEnter() {
  //   var objArray = [{ foo: '09:15', bar: 2 }, { foo: '20:20', bar: 4 }, { foo: '02:15', bar: 6 }];
  //   var result = objArray.map(a => a.foo);
  //   // console.log(objArray);
  //   console.log(result);

  //   var a = ['09:15', '20:20', '02:15'];
  //   // console.log(a);
  //   var sort = function (a) {
  //     var sa = [],
  //       d = new Date(),
  //       ds = d.toDateString();
  //     for (var i = 0; i < a.length; i++) {
  //       d = new Date(ds + ' ' + a[i]);
  //       sa.push(d);
  //     }

  //     sa.sort(function (a, b) { return a.getTime() - b.getTime(); })
  //     return sa;
  //   }

  //   console.log(a.sort());
  // }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {

      this.Reserved_restaurant_name = res.Reserved_restaurant_name;
      this.vals = Object.keys(res.photoURL).map(function (key) {
        return res.photoURL[key];
      });

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
      /////////////////////////////////////////////seperate reservation according to the date of reservation(today & after today)
      var lista = [];
      var listb = [];
      var listc = [];
      var listguestnumber = [];

      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date < dt.toISOString().substring(0, 10)) {

          listc.push(this.vals[i]);

        } else if (this.vals[i].Reserved_Date === dt.toISOString().substring(0, 10)) {

          lista.push(this.vals[i]);
          this.list_today_reservation = lista;


        } else if (this.vals[i].Reserved_Date > dt.toISOString().substring(0, 10)) {

          listb.push(this.vals[i]);
          this.list_after_today_reservation = listb;
        }
        ;
      }

      this.listalength = lista.length;
      this.listblength = listb.length;
      var arr = [];
      for (let listnumber of lista) {
        this.number = parseInt(listnumber.Reserved_Guests_number.substring(0, 1));
        console.log(listnumber.Reserved_Guests_number.substring(0, 1));
        arr.push(this.number)

      }

      console.log(arr);
  
      var total = 0;
      for (var i = 0; i < arr.length; i++) {
        total += arr[i];
        this.total = total;
        
      }

      console.log(total);

      // var arr = [1, 2, 3, 4];
      // var total = 0;
      // for (var i = 0; i < arr.length; i++) {
      //   total += arr[i];
      // }

      // console.log(total);
      //////////////////////////////////////////total number of reservations
      // alert('You have a total of ' + this.list.length + ' reservations.')

      var date = new Date().toISOString().substring(0, 10);

      var time = [];
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].Reserved_Date === date) {
          time.push(this.list[i].Reserved_Date);

        }
      }
      //////////////////////////////////////////total number of reservations for today
      // alert('You have a total of ' + time.length + ' reservations for today.')

      // //sort the hours in ascending order 
      // var result = objArray.map(a => a.Reserved_Date_hour);

      // var sort = function (result) {
      //   var sa = [],
      //     d = new Date(),
      //     ds = d.toDateString();
      //   for (var i = 0; i < result.length; i++) {
      //     d = new Date(ds + ' ' + result[i]);
      //     sa.push(d);
      //   }

      //   sa.sort(function (result, b) { return result.getTime() - b.getTime(); })
      //   return sa;

      // }
      // // sort the date in ascending order
      // var resultdate = objArray.map(a => a.Reserved_Date);
      // var sort = function (resultdate) {
      //   var sa = [],
      //     d = new Date(),
      //     ds = d.toDateString();
      //   for (var i = 0; i < resultdate.length; i++) {
      //     d = new Date(ds + ' ' + resultdate[i]);
      //     sa.push(d);
      //   }
      //   sa.sort(function (resultdate, b) { return resultdate.getTime() - b.getTime(); })
      //   return sa;
      // }

      // //["11:30", "12:30", "16:30"]
      // var newresult = result.sort();

      // var list = [];
      // //unordered reservation list: list data rendered when user made a reservation
      // // console.log(this.vals);
      // for (var j = 0; j < newresult.length; j++) {
      //   for (var i = 0; i < this.vals.length; i++) {
      //     if (this.vals[i].Reserved_Date_hour === newresult[j]) {

      //       // this.list = list;
      //       // list.push(this.vals[i]);
      //     } else {
      //       // console.log('err');
      //     }
      //   }
      // }

      // for (var j = 0; j < newresult.length; j++) {
      //   for (var q = 0; q < this.vals.length; q++) {
      //     //error occurs when same time is repeated in different day
      //     console.log(this.vals);

      //     if (newresult[j] == this.vals[q].Reserved_Date_hour) {
      //       console.log(this.vals);
      //       console.log(this.vals[q]);
      //       break

      //     } else {
      //       // console.log('err');

      //     }

      //   }

      // }
      // console.log(this.list);
      ////////////////////////////////////////////////////////////////
      // //["2017-12-22", "2017-12-23", "2017-12-28"]
      // var newresultdate = resultdate.sort();
      // console.log(newresultdate);

      // var listdate = [];
      // //semi-ordered reservation list: data in order of ascending hour


      // for (var k = 0; k < newresultdate.length; k++) {
      //   for (var x = 0; x < this.list.length; x++) {
      //     if (newresultdate[k] === this.list[x].Reserved_Date) {

      //       // console.log(this.list[x]);


      //       this.listdate = listdate;
      //       listdate.push(this.list[x]);


      //       break
      //     } else {
      //       // console.log('error');

      //     }
      //   }

      // }
      // console.log(listdate);
      ////////////////////////////////////////////////////////////////


    })
  }

}