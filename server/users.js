import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

if (Meteor.isServer) {
  // This code only runs on the server
  	/*Meteor.publish('usersNumber', function usersNumber() {
    	return Meteors.users.find().count();
  	});*/
  Meteor.methods({
  	'usersNumber': function(){
  		usersNumber = Meteor.users.find().count();
  		console.log(usersNumber);
  		return usersNumber;
  	},
  	'mylogin' : function(user){
  		console.log("login intempt");
  		usersNumber = Meteor.users.find().count();
  		if(usersNumber===0){//create the superadmin user
  			Accounts.createUser(user);
  			return 201;
  		}
  		else{
  			return 200;
  		}
  	},
  	'userId':function(){
  		return Meteor.userId();
  	}
  });
}

