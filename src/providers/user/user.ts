import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/reservedDate');
  // firereservationdata = firebase.database().ref('/reservedDate');

  constructor(public afireauth: AngularFireAuth) {
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: '',
          
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.displayName).set({
            uid: this.afireauth.auth.currentUser.uid,
            photoURL: 'give a dummy placeholder url here',
            Reserved_restaurant_name: newuser.displayName
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  // getuserdetails() {
  //   var promise = new Promise((resolve, reject) => {
  //     this.firedata.once('value', function (snapshot) {
  //       function snapshotToArray(snapshot) {
  //         var returnArr = [];

  //         snapshot.forEach(function (childSnapshot) {
  //           var item = childSnapshot.val();
  //           item.key = childSnapshot.key;

  //           returnArr.push(item);
  //         });

  //         return returnArr;
  //       };

  //       resolve(snapshotToArray(snapshot));
  //       // for (var i = 0; i < snapshotToArray(snapshot).length; i++) {
  //       //   console.log(snapshotToArray(snapshot)[i]);

  //       // }

  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   })
  //   return promise;

  // }


  getuserdetails() {

    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.displayName).once('value', (snapshot) => {
        resolve(snapshot.val());        
        // console.log(snapshot.val());
        // console.log(firebase.auth().currentUser.uid);
        // console.log(firebase.auth().currentUser.displayName);

      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}