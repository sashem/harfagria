import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import template from './recreation.html';
import {Realms} from '../../api/realms.js';

class recreationCtrl{
	constructor($scope,$stateParams,$reactive){
		$scope.viewModel(this);

		$scope.realmname = $stateParams["realm"];
		$scope.shortname = $stateParams["recreation"];

		this.realmname = $scope.realmname;
		this.shortname = $scope.shortname;

		this.subscribe("recreation",() => [
    		this.getReactively('realmname'),
    		this.getReactively('shortname')
		]);
		//console.log(this.recreationRealm);
		$scope.helpers({
			realm: function () {
				return Realms.find({name:$scope.realmname});
			}
		});
		/*Meteor.call('fetchRecreation', $scope.shortname, function(err,res){
			$scope.realm = res[0];
			console.log($scope.realm);
		});*/
		//$scope.realm = this.recreation_realm;

		//console.log($scope.realm);
	}
}

const name = "recreation";

export default angular.module(name, [
  angularMeteor
])
.component(name, {
    templateUrl: template,
    controller: recreationCtrl
});