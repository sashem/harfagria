import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {Realms} from '../../api/realms.js';
import template from './admin.html';
//import ngdraggable from 'meteor/ng-draggable';

class adminCtrl{

	constructor($scope,$auth,$reactive){
		Meteor.call('userId',function(err,userId){
			if(!userId){
				location.href = "/admin/login";
			}
		});

	 	loadFilePicker("AB0uxdy9iSVCWSuIb8nfnz");

		Meteor.subscribe("everyRealm");
		//Meteor.subscribe("realmTypes");
		
		//var Images = new FilesCollection({collectionName: 'Images'});

		'ngInject';

		AceEditor.instance("code-editor",{
			hScrollBarAlwaysVisible:true,
			wrapBehavioursEnabled:{initialValue: true},
			minLines:3,
			maxLines:99999,
			theme:"dawn"
			//mode:"html",
		},function(editor){
			editor.getSession().setUseWrapMode(true);
		});

		$reactive(this).attach($scope);

		$scope.viewModel(this);

		/*Sortable.create(document.getElementbyId(""), {
			handle: '.glyphicon-move',
			animation: 150
		});*/


		$scope.logout = function(){
			Meteor.logout(function(error){
				if(error)console.log(error);
				else location.href="";
			});
		}

		this.helpers({
			realms : function () {
				//console.log(Realms.find());
				return Realms.find();
			}
		});

		$scope.realms = this.realms;
		
		Meteor.call('realmTypes', "" , function(err,res){
		 	$scope.realmTypes = res;
		});

		$scope.moveRecreation=function(obj,realm_id){
			console.log(obj);
			console.log(realm_id);
		}

		$scope.edit_realm=function(realm){
			$scope.realm = realm;
			$scope.realmimage = {};
			$scope.realmimage.url = realm.image_url;
		}
		$scope.edit_recreation=function(recreation){
			$("#preview_html").css("display","none");
	    	$("#code-editor").css("display","block");
	    	//console.log(recreation);
			$scope.recreation = recreation;
			Meteor.call('tagTypes', "" , function(err,res){
				if($('#taginput').val()!=""){
					$('#taginput').tagsinput('destroy');
				}
				$('#taginput').val(recreation.tags.join(","));
			 	
			 	var tagnames = new Bloodhound({
				  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('tag'),
				  queryTokenizer: Bloodhound.tokenizers.whitespace,
				  local: res
				});
				
				tagnames.initialize();

				$('#taginput').tagsinput({
				  typeaheadjs: {
				    name: 'tagnames',
				    displayKey: 'tag',
				    valueKey: 'tag',
				    source: tagnames.ttAdapter()
				  }
				});
			});

			AceEditor.instance("code-editor",null,function(editor){
		   		editor.setValue(recreation.content);
		   		editor.clearSelection();
		   	});
		}
		$scope.dragCtrl=function(evt){
			console.log(evt);
		}
		$scope.set_shortname=function(){
			$scope.recreation.shortname = $scope.recreation.name.replace(/\s|:/g,"-");
		}

		$scope.prepareRealmModal = function(){
			$scope.realm = {};
			$scope.realmimage = {};
			//$scope.apply();
		}
		$scope.prepareRecreationModal = function(realm_id){
			$("#preview_html").css("display","none");
	    	$("#code-editor").css("display","block");
			$scope.recreation = {}
			$scope.recreation.realm_id = realm_id;
			AceEditor.instance("code-editor",null,function(editor){
		   		editor.setValue("");
		   	});
			//$scope.apply();
		}
		$scope.select_recreation_img = function(){
			filepicker.pick({
	        mimetype: 'image/*', /* Images only */
	        maxSize: 1024 * 1024 * 5, /* 5mb */
	        imageMax: [1500, 1500], /* 1500x1500px */
	        cropRatio: 1/1, /* Perfect squares */
	        services: ['GOOGLE_DRIVE'] /* All available third-parties */
		    }, function(blob){
		        // Returned Stuff
		        $scope.recreation.img = blob.url;
		        //console.log($scope.realmimage);
		        $scope.$apply();
		    });
		}
		$scope.remove_realm=function(realm){
			console.log('trying to remove:' + realm._id);
			Meteor.call('removeRealm', realm._id , function(err,res){
			 	$scope.realm = {};
			 	$scope.realmimage = {};
			});
		}
		$scope.remove_recreation=function(recreation){
			//console.log('trying to remove:' + recreation._id);
			Meteor.call('removeRecreation', recreation , function(err,res){
			 	$scope.recreation = {};
			});
		}
		$scope.unselectRealm = function (){
			$scope.realm = {};
			$scope.realmimage = {};
		}
		$scope.add_image=function(){
			filepicker.pick({
	        mimetype: 'image/*', /* Images only */
	        maxSize: 1024 * 1024 * 5, /* 5mb */
	        imageMax: [1500, 1500], /* 1500x1500px */
	        cropRatio: 1/1, /* Perfect squares */
	        services: ['GOOGLE_DRIVE'] /* All available third-parties */
		    }, function(blob){
		        // Returned Stuff
		        $scope.realmimage = blob;
		        //console.log($scope.realmimage);
		        $scope.$apply();
		    });
	    }
	    $scope.insertPicUrl=function(){
			filepicker.pick({

	        mimetype: 'image/*', /* Images only */
	        maxSize: 1024 * 1024 * 5, /* 5mb */
	        imageMax: [1500, 1500], /* 1500x1500px */
	        cropRatio: 1/1, /* Perfect squares */
	        services: ['GOOGLE_DRIVE'] /* All available third-parties */
		    }, function(blob){
		    	console.log(blob);
		        AceEditor.instance("code-editor",null,function(editor){
				   editor.insert('<img width="" height="" src="'+blob.url+'">');
				   editor.focus();
				});
		    });
	    }

	    $scope.englobe_text=function(tag,classes=""){
    		AceEditor.instance("code-editor",null,function(editor){
			   	rango = editor.selection.getRange();
			   	texto = editor.session.getTextRange(rango);
			   	editor.session.insert(rango.end,"</"+tag+">");
			   	editor.session.insert(rango.start,"<"+tag+" class=\""+classes+"\">");
			   	editor.clearSelection();
			   	if(texto==""){
				   	editor.moveCursorToPosition({row:rango.start.row,column:rango.start.column+tag.length+2+classes.length+9});
				}else{
					editor.moveCursorToPosition({row:rango.end.row,column:rango.end.column+tag.length*2+5+classes.length+9});
				}
				editor.focus();
			});
	    }
	    $scope.add_tag=function(tag,classes=""){
	    	AceEditor.instance("code-editor",null,function(editor){
			   //console.log(editor.getCursor());
			   rango = editor.selection.getRange();
			   editor.insert("<"+tag+" class=\""+classes+"\">"+"</"+tag+">");
			   editor.focus();
			});	
	    }
	    $scope.add_list=function(t){
	    	AceEditor.instance("code-editor",null,function(editor){
			   rango = editor.selection.getRange();
			   editor.insert("<ul class=\"lista\">\n\t<li></li>\n\t<li></li>\n</ul>");
			   editor.focus();
			});	
	    }
	    $scope.add_table=function(){
	    	AceEditor.instance("code-editor",null,function(editor){
			   rango = editor.selection.getRange();
			   editor.insert("<table class=\"table table-hover\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th></th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td></td>\n\t\t</tr>\n\t</tbody>\n</table>");
			   editor.focus();
			});	
	    }
	    $scope.add_div_col=function(rows_array){
	    	aux_html = '<div class="row">';
	    	for (n in rows_array){
	    		col = rows_array[n];
	    		aux_html = aux_html + '\n\t<div class="col-md-'+col+'">\n\n\t</div>';
	    	}
	    	aux_html = aux_html + '\n</div>';
	    	AceEditor.instance("code-editor",null,function(editor){
			   editor.insert(aux_html);
			   editor.focus();
			});	
	    }

	    $scope.preview_mode = false;
	    $scope.preview=function(){
	    	$scope.preview_mode = !$scope.preview_mode;
	    	if($scope.preview_mode){
		    	$("#code-editor").css("display","none");
		    	AceEditor.instance("code-editor",null,function(editor){
			   	$scope.preview_html = editor.getValue(); ;
			   	});
		 	   	$("#preview_html").css("display","block");
	    	}else{
				$("#preview_html").css("display","none");
	    		$("#code-editor").css("display","block");
	    		AceEditor.instance("code-editor",null,function(editor){
			   	editor.focus();
			   	});
	    	}
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

		$scope.save_recreation = function(){
			AceEditor.instance("code-editor",null,function(editor){
				$scope.recreation.content = editor.getValue();
			});
			$scope.recreation.tags = $("#taginput").tagsinput('items');
			console.log($scope.recreation);
			if(!$scope.recreation._id){ //recreation : {name:string,content:string,realm_name:string}
		 		Meteor.call('createRecreation',$scope.recreation, function(err,res){
	 				$scope.recreation = {};
	 				AceEditor.instance("code-editor",null,function(editor){
				   		editor.setValue("");
				   	});
			 	});
		 	}else{
		 		Meteor.call('updateRecreation',$scope.recreation, function(err,res){
			 		$scope.recreation = {};
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
  angularMeteor//,ngdraggable//,'ngDragDrop'
])
.component(name, {
    templateUrl:template,
    controllerAs: name,
    controller: adminCtrl
});