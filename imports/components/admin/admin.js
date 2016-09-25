import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
import {Realms} from '../../api/realms.js';

import template from './admin.html';

class adminCtrl{

	constructor($scope,$auth,$reactive){
		Meteor.call('userId',function(err,userId){
			if(!userId){
				location.href = "admin/login";
			}
		});	

		'ngInject';
		$reactive(this).attach($scope);

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
			},
			image() {
				return this.currentFile;
			}
		});

		$scope.addRealmImage = function(file){
			console.log(file);
		}
		$scope.createRealm=function() {
			console.log(this.currentFile);
			console.log($scope.realmImage);
		 	Meteor.call('createRealm',$scope.realm, $scope.realmImage, function(err,res){
		 		console.log(res);
		 	});   
		}
	}
}


const name = "admin";

export default angular.module(name, [
  angularMeteor,
  ngFileUpload
])
.component(name, {
    templateUrl:template,
    controllerAs: name,
    controller: adminCtrl
});