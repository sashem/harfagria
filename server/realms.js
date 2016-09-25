import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Realms } from '../imports/api/realms.js'


if (Meteor.isServer) {
  // This code only runs on the server
  	/*Meteor.publish('usersNumber', function usersNumber() {
    	return Meteors.users.find().count();
  	});*/
  Meteor.methods({
  	'createRealm': function(realm,image){
      console.log(realm);
      console.log(image);
       if(Meteor.userId()){
        var fs = Npm.require('fs');
        root_path = "../../../../../public/img";
        fs.writeFile(root_path + image.name, image);
       }
  	}
  });
}

