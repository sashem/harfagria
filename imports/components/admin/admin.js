import angular from 'angular';
import Meteor from 'meteor/meteor';
import angularMeteor from 'angular-meteor';

import {Realms} from '../../api/realms.js';

import template from './admin.html';

class adminCtrl{
	constructor($scope,$auth){
		console.log($auth.currentUser);
		if(!$auth.currentUser){
			location.href = "admin/login";
		}

		$scope.viewModel(this);

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