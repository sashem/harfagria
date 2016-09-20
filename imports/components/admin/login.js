import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import template from './login.html';

class loginCtrl{
	constructor($scope){
		if (Meteor.isClient) {
			$scope.viewModel(this);
			Meteor.call('usersNumber',function(err,usersNumber){$scope.usersNumber = usersNumber});
		}
		$scope.user = {};

		$scope.login = function(){
			console.log('logintry');
			Meteor.call('mylogin',$scope.user,function(err,res){
				if(res==200){
					Meteor.loginWithPassword({email:$scope.user.email}, $scope.user.password, function(error){
		  				if(error){
		  					console.log(error);	
		  				}else{
		  					console.log("logged in!");
		  					location.href="/admin";
		  				}
		  			});
				}
			});
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