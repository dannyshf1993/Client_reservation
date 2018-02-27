import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { UserProvider } from '../../providers/user/user';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";// import { linkToSegment } from 'ionic-angular/navigation/nav-util';
import firebase from 'firebase';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  totalOct: number;
  arrOct: any[];
  totalSep: number;
  arrSep: any[];
  totalAug: number;
  arrAug: any[];
  totalJul: number;
  arrJul: any[];
  totalJun: number;
  arrJun: any[];
  totalMay: number;
  arrMay: any[];
  totalApr: number;
  arrApr: any[];
  totalMar: number;
  arrMar: any[];
  totalFeb: number;
  arrFeb: any[];
  totalJan: number;
  arrJan: any[];
  totalNov: number;
  arrNov: any[];
  arrDec: any[];
  totalDec: number;
  number: number;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

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

  constructor(
    public navParams: NavParams,
    public userservice: UserProvider,
    public zone: NgZone,
    public afd: AngularFireDatabase,
    public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider) {
    // this.reservedDate = this.afd.list('/reservedDate', { preserveSnapshot: true });

  }


  ionViewDidLoad() {
    this.loaduserdetails();
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });




    this.userservice.getuserdetails().then((res: any) => {

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

      var objArray = this.vals;

      objArray.sort(function (a, b) {
        return new Date(a.Reserved_Date).getTime() - new Date(b.Reserved_Date).getTime() || a.Reserved_Date_hour.localeCompare(b.Reserved_Date_hour);
      });

      var list = [];
      for (var i = 0; i < this.vals.length + 1; i++) {
        this.list = list;
        list = objArray;

      }
      // //////////////////////////////////////////////////
      var arrJan = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "01") {
          console.log(this.vals[i].Reserved_Guests_number.substring(0, 1));
          var a = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrJan.push(a);
          this.arrJan = arrJan;
        }
      }
      var totalJan = 0;
      for (var i = 0; i < arrJan.length; i++) {
        totalJan += arrJan[i];
      }
      this.totalJan = totalJan;
      console.log(totalJan);
      // /////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      var arrFeb = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "02") {
          console.log(this.vals[i].Reserved_Guests_number.substring(0, 1));
          var b = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrFeb.push(b);
          this.arrFeb = arrFeb;
        }
      }
      var totalFeb = 0;
      for (var i = 0; i < arrFeb.length; i++) {
        totalFeb += arrFeb[i];
      }
      this.totalFeb = totalFeb;
      console.log(totalFeb);
      // /////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      var arrMar = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "03") {
        
          var c = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrMar.push(c);
          this.arrMar = arrMar;
        }
      }
      var totalMar = 0;
      for (var i = 0; i < arrMar.length; i++) {
        totalMar += arrMar[i];
      }
      this.totalMar = totalMar;
      console.log(totalMar);
      // /////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      var arrApr = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "04") {
       
          var d = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrApr.push(d);
          this.arrApr = arrApr;
        }
      }
      var totalApr = 0;
      for (var i = 0; i < arrApr.length; i++) {
        totalApr += arrApr[i];
      }
      this.totalApr = totalApr;
      console.log(totalApr);
      // /////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      var arrMay = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "05") {
    
          var e = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrMay.push(e);
          this.arrMay = arrMay;
        }
      }
      var totalMay = 0;
      for (var i = 0; i < arrMay.length; i++) {
        totalMay += arrMay[i];
      }
      this.totalMay = totalMay;
      console.log(totalMay);
      // /////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      var arrJun = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "06") {
    
          var f = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrJun.push(f);
          this.arrJun = arrJun;
        }
      }
      var totalJun = 0;
      for (var i = 0; i < arrJun.length; i++) {
        totalJun += arrJun[i];
      }
      this.totalJun = totalJun;
      console.log(totalJun);
      // /////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      var arrJul = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "07") {
      
          var g = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrJul.push(g);
          this.arrJul = arrJul;
        }
      }
      var totalJul = 0;
      for (var i = 0; i < arrJul.length; i++) {
        totalJul += arrJul[i];
      }
      this.totalJul = totalJul;
      console.log(totalJul);
      /////////////////////////////////////////////////
      //////////////////////////////////////////////////
      var arrAug = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "08") {
      
          var h = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrAug.push(h);
          this.arrAug = arrAug;
        }
      }
      var totalAug = 0;
      for (var i = 0; i < arrAug.length; i++) {
        totalAug += arrAug[i];
      }
      this.totalAug = totalAug;
      console.log(totalAug);
      /////////////////////////////////////////////////
      //////////////////////////////////////////////////
      var arrSep = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "09") {
        
          var l = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrSep.push(l);
          this.arrSep = arrSep;
        }
      }
      var totalSep = 0;
      for (var i = 0; i < arrSep.length; i++) {
        totalSep += arrSep[i];
      }
      this.totalSep = totalSep;
      console.log(totalSep);
      ///////////////////////////////////////////////
      ////////////////////////////////////////////////
      var arrOct = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "10") {
       
          var m = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrOct.push(m);
          this.arrOct = arrOct;
        }
      }
      var totalOct = 0;
      for (var i = 0; i < arrOct.length; i++) {
        totalOct += arrOct[i];
      }
      this.totalOct = totalOct;
      console.log(totalOct);
      /////////////////////////////////////////////////

      //////////////////////////////////////////////////
      var arrNov = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "11") {
       
          var j = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrNov.push(j);
          this.arrNov = arrNov;
        }
      }
      var totalNov = 0;
      for (var i = 0; i < arrNov.length; i++) {
        totalNov += arrNov[i];
      }
      this.totalNov = totalNov;
      console.log(totalNov);
      /////////////////////////////////////////////////


      //////////////////////////////////////////////////
      var arrDec = [];
      for (var i = 0; i < this.vals.length; i++) {
        if (this.vals[i].Reserved_Date.substring(5, 7) === "12") {
        
          var k = +this.vals[i].Reserved_Guests_number.substring(0, 1);
          arrDec.push(k);
          this.arrDec = arrDec;
        }
      }
      var totalDec = 0;
      for (var i = 0; i < arrDec.length; i++) {
        totalDec += arrDec[i];
      }
      this.totalDec = totalDec;
      console.log(totalDec);
      /////////////////////////////////////////////////

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [
            {
              label: "Covers(Number of reservations)",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              //no. of reservations made 
              //input data daily
              data: [totalJan, totalFeb, totalMar, totalApr, totalMay, totalJun, totalJul, totalAug, totalSep, totalOct, totalNov, totalDec],
              spanGaps: false,
            }
          ]
        }

      });
    })
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {

      this.Reserved_restaurant_name = res.Reserved_restaurant_name;
      console.log(this.Reserved_restaurant_name);

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

      var objArray = this.vals;

      objArray.sort(function (a, b) {
        return new Date(a.Reserved_Date).getTime() - new Date(b.Reserved_Date).getTime() || a.Reserved_Date_hour.localeCompare(b.Reserved_Date_hour);
      });

      var list = [];
      for (var i = 0; i < this.vals.length + 1; i++) {
        this.list = list;
        list = objArray;

      }



    })
  }

}