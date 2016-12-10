import {Mongo} from 'meteor/mongo';
export const Realms = new Mongo.Collection('realms');
export const realmNames = new Mongo.Collection('realmNames');