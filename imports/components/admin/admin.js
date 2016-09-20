import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';

import {Realms} from '../../api/realms.js';

import template from './admin.html';

class adminCtrl{
	constructor($scope,$auth){
		Meteor.call('userId',function(err,userId){
			if(!userId){
				location.href = "admin/login";
			}
		});	

		$scope.viewModel(this);

		$scope.logout = function(){
			Meteor.logout(function(error){
				if(error)console.log(error);
				else location.href="";
			})
		}

		this.helpers({
			realms () {
				return Realms.find({});
			}
		});

	}
}

const name = "admin";

export default angular.module(name, [
  angularMeteor
])
.component(name, {
    templateUrl:template,
    controller: adminCtrl
});