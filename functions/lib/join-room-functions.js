"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// import * as models from "../../src/app/models";
if (!admin.apps.length) {
    admin.initializeApp();
}
const firestoredb = admin.firestore();
module.exports = functions.https.onCall((data, context) => {
    // tslint:disable:no-console
    // const x = new Promise(resolve => {
    //   setTimeout(resolve, 10000);
    // });
    // return x.then(() => {
    //   return { id: 'its resolved' };
    // });
    return rxjs_1.from(firestoredb
        .collection('gameJoinCodes')
        .where('code', '==', data.joinCode)
        .get())
        .pipe(operators_1.map(gameJoinCodeActions => {
        const docs = gameJoinCodeActions.docs;
        if (docs.length < 1) {
            throw Error('Game Code Not Found');
        }
        else {
            return docs[0].data();
        }
    }), operators_1.flatMap((gameJoinCode) => {
        return rxjs_1.from(firestoredb
            .collection('games')
            .doc(gameJoinCode.gameRef)
            .get()).pipe(operators_1.first());
    }), operators_1.flatMap(gameAction => {
        const game = gameAction.data();
        if (!game) {
            throw Error("Game doesn't exist");
        }
        else {
            const newPlayers = [...game.players, data.player];
            return rxjs_1.from(firestoredb
                .collection('games')
                .doc(gameAction.id)
                .set(JSON.parse(JSON.stringify({ players: newPlayers })), { merge: true })).pipe(operators_1.first(), operators_1.map(() => {
                return { id: gameAction.id };
            }));
        }
    }))
        .toPromise()
        .then(result => {
        return result;
    });
});
//# sourceMappingURL=join-room-functions.js.map