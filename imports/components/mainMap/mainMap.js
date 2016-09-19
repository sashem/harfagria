import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Realms} from '../../api/realms.js';

import template from './mainMap.html';

class mainMapCtrl{
	constructor($scope){
		$scope.viewModel(this);

		this.helpers({
			realms () {
				return Realms.find({});
			}
		});
	}
}

export default angular.module('mainMap', [
  angularMeteor
])
.component('mainMap', {
    templateUrl: 'imports/components/map/mainMap.html',
    controller: 'mainMapCtrl'
});