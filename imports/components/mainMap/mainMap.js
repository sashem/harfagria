import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './mainMap.html';
import {Meteor} from 'meteor/meteor';
import {Realms} from '../../api/realms.js';


class mainMapCtrl{
	constructor($scope){

		$scope.viewModel(this);

		Meteor.subscribe("realmsList");
		this.helpers({
			realms : function () {
				return Realms.find({});
			}
		});
		$scope.realms = this.realms;
		
		$scope.position = 0;
		//console.log($scope.realms);
		$scope.active = function(realm){
			var curr_url = window.location.href;;
			if(curr_url.indexOf(realm)>-1){
				return "active";
			}
		}
		
	}
}

const name = "mainMap";

export default angular.module(name, [
  angularMeteor
])
.component(name, {
    templateUrl: template,
    controller: mainMapCtrl
});