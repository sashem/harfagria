import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';

import template from './login.html';

class loginCtrl{
	constructor($scope){
		if (Meteor.isServer) {
			$scope.viewModel(this);
			users = Meteor.call('usersNumber');
			console.log(users);
		}
	}
}

const name = "login";

export default angular.module(name, [
  angularMeteor,'accounts.ui'
])
.component(name, {
    templateUrl: template,
    controller: loginCtrl
});