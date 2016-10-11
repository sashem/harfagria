import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {Realms} from '../../api/realms.js';
import template from './admin.html';

class adminCtrl{

	constructor($scope,$auth,$reactive){
		Meteor.call('userId',function(err,userId){
			if(!userId){
				location.href = "admin/login";
			}
		});

	 	loadFilePicker("AB0uxdy9iSVCWSuIb8nfnz");

		Meteor.subscribe("realmsList");
		
		//var Images = new FilesCollection({collectionName: 'Images'});

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
			realms : function () {
				//console.log(Realms.find());
				return Realms.find();
			}
		});
		$scope.realms = this.realms;

	 	//$scope.aux = "main_title";
	 	//$scope.realmimage = {};
	 	
		$scope.addRealmImage = function(file){
			console.log(file);
			//bin_image = file.getAsBinary();
			//console.log(bin_image);
			//console.log(reader.readAsText(file));
			//console.log(encodeImageData(file))	
		}

		$scope.edit_realm=function(realm){
			$scope.realm = realm;
			$scope.realmimage = {};
			$scope.realmimage.url = realm.image_url;
		}
		$scope.remove_realm=function(realm){
			console.log('trying to remove:' + realm._id);
			Meteor.call('removeRealm', realm._id , function(err,res){
			 	$scope.realm = {};
			 	$scope.realmimage = {};
			});
		}
		$scope.unselect = function (){
			$scope.realm = {};
			$scope.realmimage = {};
		}
		$scope.add_image=function(){
			filepicker.pick({
	        mimetype: 'image/*', /* Images only */
	        maxSize: 1024 * 1024 * 5, /* 5mb */
	        imageMax: [1500, 1500], /* 1500x1500px */
	        cropRatio: 1/1, /* Perfect squares */
	        services: ['COMPUTER'] /* All available third-parties */
		    }, function(blob){
		        // Returned Stuff
		        $scope.realmimage = blob;
		        //console.log($scope.realmimage);
		        $scope.$apply();
		    });
	    }

		$scope.createRealm=function() {
	 	 	//console.log($scope.realmimage);
	 	 	if(!$scope.realm._id){
		 		Meteor.call('createRealm',$scope.realm, $scope.realmimage , function(err,res){
			 				$scope.realm = {};
			 				$scope.realmimage = {};
			 	});
		 	}else{
		 		Meteor.call('updateRealm',$scope.realm, $scope.realmimage , function(err,res){
			 				$scope.realm = {};
			 				$scope.realmimage = {};
			 	});
		 	}

		}
	}
}

function encodeImageData (imageData, encoding) {
	var buffer = new Buffer(imageData, encoding || 'binary');
	return buffer.toString('base64');
}

const name = "admin";

export default angular.module(name, [
  angularMeteor
])
.component(name, {
    templateUrl:template,
    controllerAs: name,
    controller: adminCtrl
});