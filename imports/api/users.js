import {Mongo} from 'meteor/mongo';
import Meteor from 'meteor/meteor';
export const Realms = new Mongo.Collection('realms');

if (Meteor.isServer) {
  // This code only runs on the server
  	/*Meteor.publish('usersNumber', function usersNumber() {
    	return Meteors.users.find().count();
  	});*/
  Meteor.methods({
  	'usersNumber': function(){
  		return Meteors.users.find().count();
  	}
  });
}

