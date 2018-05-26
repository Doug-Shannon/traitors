import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Observable, from as ObservableFrom } from 'rxjs';
import { map, flatMap, first } from 'rxjs/operators';

if (!admin.apps.length) {
  admin.initializeApp();
}
const firestoredb: FirebaseFirestore.Firestore = admin.firestore();

module.exports = functions.https.onCall((data: { joinCode: string; player: any }, context) => {
  return ObservableFrom(
    firestoredb
      .collection('gameJoinCodes')
      .where('code', '==', data.joinCode)
      .get()
  )
    .pipe(
      map(gameJoinCodeActions => {
        const docs = gameJoinCodeActions.docs;
        if (docs.length < 1) {
          throw Error('Game Code Not Found');
        } else {
          return docs[0].data();
        }
      }),
      flatMap((gameJoinCode: { code: string; gameRef: string }) => {
        return ObservableFrom(
          firestoredb
            .collection('games')
            .doc(gameJoinCode.gameRef)
            .get()
        ).pipe(first());
      }),
      flatMap(gameAction => {
        const game = gameAction.data();
        if (!game) {
          throw Error("Game doesn't exist");
        } else {
          const newPlayers = [...game.players, data.player];
          return ObservableFrom(
            firestoredb
              .collection('games')
              .doc(gameAction.id)
              .set(JSON.parse(JSON.stringify({ players: newPlayers })), { merge: true })
          ).pipe(
            first(),
            map(() => {
              return { id: gameAction.id };
            })
          );
        }
      })
    )
    .toPromise()
    .then(result => {
      return result;
    });
});
