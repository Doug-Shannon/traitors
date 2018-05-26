import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as onGameCreate from './on-game-create';
import * as joinRoom from './join-room-functions';

export const onGameCreateTrigger = onGameCreate;
export const joinRoomOnCall = joinRoom;
