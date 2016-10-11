import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './mainMap.html';
import {Meteor} from 'meteor/meteor';
import {Realms} from '../../api/realms.js';


class mainMapCtrl{
	constructor($scope){

		//console.log("mainMapCtrl loaded!");

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
		$scope.rotate_left = function(){
			$scope.realms.push($scope.realms.shift());
			//console.log($scope.realms);
		};
		
		$scope.rotate_right = function(){
			$scope.realms.unshift($scope.realms.pop());
			//console.log($scope.realms);
		};
		$scope.set_center = function(id){
			//console.log($scope.realms[1]._id);
			//console.log(id);
			while($scope.realms[1]._id!=id){
				$scope.rotate_right();
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