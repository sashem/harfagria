import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Realms } from '../imports/api/realms.js';

if (Meteor.isServer) {
  Meteor.publish('realmTypes', function() {
    return Realms.distinct("name");
  });
  Meteor.publish('everyRealm', function() {
    return Realms.find();
  });
  Meteor.publish('wholeRealm', function(name) {
    return Realms.find({name:name});
  });
  Meteor.publish('recreation', function(realmname,shortname){
    return Realms.find(
      {name:realmname},
      {
        fields:{
          recreations: {$elemMatch: {shortname:shortname}},
          image:0,
          description:0
        }
      }
    );
    //console.log(aux.fetch());
    //console.log(aux);
    
  });
  

  Meteor.methods({
  	'createRealm': function(realm,image){
        if(Meteor.userId()){
          Realms.insert({
            name : realm.name,
            description : realm.description,
            image_url : image.url
          })
  	    }
    },
    /*'fetchRecreation':function(shortname){
      console.log(shortname);
      aux = Realms.aggregate(
        {$unwind:"$recreations"},
        {$match:{"recreations.shortname":shortname}}
      );
       console.log(aux)
       return aux;
    },*/
    'updateRealm': function(realm,image){
          Realms.update(
            realm._id,
            {
              name : realm.name,
              description : realm.description,
              image_url : image.url
            }
          );
    },
    'removeRealm': function(id){
        Realms.remove(id);
    },
    'realmTypes':function(){
        //console.log(distinct(Realms,"name"));
        return distinct(Realms,"name");
    },
    'tagTypes':function(){
        //console.log(distinct(Realms,"name"));
        aux = [];
        Realms.find({}).map(function(u){
          for (r in u.recreations){
            rec= u.recreations[r];
            //console.log(rec);
            for (t in rec.tags){
              tag = rec.tags[t];
              //console.log(tag);
              if(aux.indexOf(tag)==-1){
                aux.push({tag:tag});
              }
            }
          }
        });
        return aux;
    },
    'createRecreation': function(recreation){
      recreation._id = new Meteor.Collection.ObjectID().valueOf();
      console.log(recreation);
      if(Meteor.userId()){
        aux = Realms.find({
            $and:[
              {_id:recreation.realm_id},
              {recreations:{$exists:true}}
            ]
          }).count();
        if(aux == 0){
          Realms.update({_id:recreation.realm_id},{$set:{recreations:[]}});
        }
        Realms.update({_id:recreation.realm_id},{$addToSet:{recreations:recreation}});  
      }
    },
    'updateRecreation': function(recreation){
      if(Meteor.userId()){
        Realms.update(
          {"_id":recreation.realm_id,"recreations._id":recreation._id},
          {$set:{"recreations.$":recreation}}
        );
      }    
    },
    'removeRecreation': function(recreation){
      if(Meteor.userId()){
        //console.log(recreation);
        Realms.update(
          {"_id":recreation.realm_id},  
          {$pull: {'recreations': {'_id': recreation._id}}},
          function(err,evt){
            //console.log(err);
            //console.log(evt);
          }
        );
      }
    }
  });

  function distinct(collection, field) {
    return _.uniq(collection.find({}, {
      sort: {[field]: 1}, fields: {[field]: 1}
    }).map(x => x[field]), true);
  }

}

