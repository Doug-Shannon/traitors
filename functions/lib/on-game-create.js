"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// import * as models from "../../src/app/models";
const availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
if (!admin.apps.length) {
    admin.initializeApp();
}
const firestoredb = admin.firestore();
module.exports = functions.firestore
    .document('games/{gameId}')
    .onCreate((snap, context) => {
    return rxjs_1.from(firestoredb.collection('gameJoinCodes').get())
        .pipe(operators_1.map(results => {
        const data = results.docs.map(doc => doc.data());
        let joinCode = '';
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
        }
        else {
            return joinCode;
        }
    }), operators_1.flatMap(joinCode => {
        return rxjs_1.from(firestoredb
            .collection('games')
            .doc(snap.id)
            .update({ gameJoinCode: joinCode })).pipe(operators_1.map(() => {
            return joinCode;
        }));
    }), operators_1.flatMap(joinCode => {
        return rxjs_1.from(firestoredb
            .collection('gameJoinCodes')
            .doc()
            .set({ code: joinCode, gameRef: snap.id })).pipe(operators_1.map(() => {
            return joinCode;
        }));
    }))
        .toPromise();
});
function pickRandomLetter() {
    return availableLetters.charAt(Math.floor(Math.random() * availableLetters.length));
}
//# sourceMappingURL=on-game-create.js.map