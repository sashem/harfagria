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
    return Realms.find();
  });

  Meteor.methods({
  	'createRealm': function(realm,image){
        if(Meteor.userId()){
          Realms.insert({
            name : realm.name,
            description : realm.description,
            image_url : image.url
          })
  	    }
    },
    'updateRealm': function(realm,image){
          Realms.update(
            realm._id,
            {
              name : realm.name,
              description : realm.description,
              image_url : image.url
            }
          );
    },
    'removeRealm': function(id){
        Realms.remove(id)
    }
  });

}

