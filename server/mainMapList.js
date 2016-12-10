import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Realms } from '../imports/api/realms.js';

if (Meteor.isServer) {
  // This code only runs on the server
  	/*Meteor.publish('usersNumber', function usersNumber() {
    	return Meteors.users.find().count();
  	});*/
  Meteor.publish('realmsList', function() {
    //console.log(Realms.find());
    return Realms.find({},{fields:{
      description:0,
      image_url:0,
      recreations:0
    }});
  });
    
}

