import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Realms} from '../../api/realms.js';

import template from './home.html';

class homeCtrl{
	constructor($scope){
		$scope.viewModel(this);

		this.helpers({
			realms () {
				return Realms.find({});
			}
		});
	}
}

const name = "home";

export default angular.module(name, [
  angularMeteor
])
.component(name, {
    templateUrl: template,
    controller: homeCtrl
});