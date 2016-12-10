import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import template from './realm.html';
import {Realms} from '../../api/realms.js';

class realmCtrl{
	constructor($scope,$stateParams){
		$scope.viewModel(this);
		
		$scope.title = $stateParams["realm"];

		this.name = $scope.title;
		this.subscribe("wholeRealm",()=>[
			this.getReactively("name")
		]);

		this.helpers({
			realm : function () {
				return Realms.find({name:$scope.title});
			}
		});
		$scope.realm = this.realm;

		Meteor.call('tagTypes', "" , function(err,res){
				if($('#rec_filter').val()!=""){
					$('#rec_filter').tagsinput('destroy');
				}
				//$('#rec_filter').val(recreation.tags.join(","));
			 	
			 	var tagnames = new Bloodhound({
				  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('tag'),
				  queryTokenizer: Bloodhound.tokenizers.whitespace,
				  local: res
				});
				
				tagnames.initialize();

				$('#rec_filter').tagsinput({
				  typeaheadjs: {
				    name: 'tagnames',
				    displayKey: 'tag',
				    valueKey: 'tag',
				    source: tagnames.ttAdapter()
				  }
				});
			});
		$scope.add_tag=function(tag){
			$('#rec_filter').tagsinput('add',tag);
		};

		$scope.rec_filter_fn = function(){

		}

		//console.log($scope.realm);
	}
}

const name = "realmview";

export default angular.module(name, [
  angularMeteor
])
.component(name, {
    templateUrl: template,
    controller: realmCtrl
}).filter('filterByTags', function () {
	return function (items, tags) {
		//console.log(items);
		if(tags=="" || !tags){return items;}
        tags = tags.split(",");
		filtered = [];
		keyss = [];
		//console.log(keyss);
        for(ii in items){
        	item = items[ii];
        	//console.log(item);
        	for(t in tags){
        		tag = tags[t];
        		//console.log(item.tags.indexOf(tag));
        		if(item.tags.indexOf(tag)==-1) keyss.push(ii);
        	}
        }
        //console.log(keyss);
        //items_ies = object.keys(items).diff(keyss);
        for(k in items){
        	if(keyss.indexOf(k)==-1){
	        	n_item = items[k];
	        	filtered.push(n_item);
        	}
        }

        return filtered; // Return the array with items that match any tag
	};
});