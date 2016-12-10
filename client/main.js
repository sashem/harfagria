import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngSanitizer from 'angular-sanitize';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';
import mainMap from '../imports/components/mainMap/mainMap';
import admin from '../imports/components/admin/admin';
import login from '../imports/components/admin/login';
import home from '../imports/components/content/home';
import realmview from '../imports/components/content/realmview';
import recreation from '../imports/components/content/recreation';
import {Meteor} from 'meteor/meteor';
import {Realms} from '../imports/api/realms.js';

const name = "main";

angular.module(name, 
	[
		angularMeteor,
		angularMeteorAuth, 
		uiRouter,
		mainMap.name,
		admin.name,
		login.name,
		home.name,
		realmview.name,
		recreation.name,
		ngSanitizer
	]
	).config(config);

class main{
	
}


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
		})
		.state('realm', {
			url: '/realms/:realm',
			template: '<realmview></realmview>'
		})
		.state('recreation', {
			url: '/realms/:realm/:recreation',
			template: '<recreation></recreation>'
		})
		.state('/', {
			url: '/',
			template: '<home></home>'
		});
}
