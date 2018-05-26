import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Observable, from as observableFrom } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
// import * as models from "../../src/app/models";

const availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
if (!admin.apps.length) {
  admin.initializeApp();
}
const firestoredb: FirebaseFirestore.Firestore = admin.firestore();

module.exports = functions.firestore
  .document('games/{gameId}')
  .onCreate((snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) => {
    return observableFrom(firestoredb.collection('gameJoinCodes').get())
      .pipe(
        map(results => {
          const data = results.docs.map(doc => doc.data() as { code: string; docRef: string });
          let joinCode: string = '';
          let counter = 0;
          do {
            joinCode = '';
            for (let index = 0; index < 8; index++) {
              joinCode += pickRandomLetter();
            }
            counter++;
          } while (data.find(roomJoinCode => roomJoinCode.code === joinCode) && counter <= 100);

          if (counter >= 100) {
            throw Error('Could Not generate unique room code');
          } else {
            return joinCode;
          }
        }),
        flatMap(joinCode => {
          return observableFrom(
            firestoredb
              .collection('games')
              .doc(snap.id)
              .update({ gameJoinCode: joinCode })
          ).pipe(
            map(() => {
              return joinCode;
            })
          );
        }),
        flatMap(joinCode => {
          return observableFrom(
            firestoredb
              .collection('gameJoinCodes')
              .doc()
              .set({ code: joinCode, gameRef: snap.id })
          ).pipe(
            map(() => {
              return joinCode;
            })
          );
        })
      )
      .toPromise();
  });

function pickRandomLetter() {
  return availableLetters.charAt(Math.floor(Math.random() * availableLetters.length));
}
