import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';
import mainMap from '../imports/components/mainMap/mainMap';
import admin from '../imports/components/admin/admin';
import login from '../imports/components/admin/login';

class main {}

const name = "main";

angular.module(name, [
	angularMeteor,
	angularMeteorAuth, 
	uiRouter,
	mainMap.name,
	admin.name,
	login.name
]).config(config);


function config($locationProvider,$urlRouterProvider,$stateProvider) {
  	'ngInject';
  	$locationProvider.html5Mode(true);
  	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('admin', {
			url: '/admin',
			template: '<admin></admin>',
		})
		.state('login', {
			url: '/admin/login',
			template: '<login></login>'
		});
}
