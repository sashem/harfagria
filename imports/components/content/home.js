import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';

import template from './home.html';

class homeCtrl{
	
}

const name = "home";

export default angular.module(name, [
  angularMeteor
])
.component(name, {
    templateUrl: template,
    controller: homeCtrl
});