!function(){window.DataCollectionApp=Ember.Application.create({LOG_TRANSITIONS:!0}),console.log("hallo")}(),function(){window.ArrayMapHelpers={},ArrayMapHelpers.stringToTagObject=function(a){return Ember.Object.create({name:a,tag:a.toLowerCase().replace(/\//g,"-").replace(/ /g,"-"),checked:!1})}}(),function(){Ember.Handlebars.helper("tagize",function(a){return a.replace("/","-").toLowerCase()})}(),function(){DataCollectionApp.ApplicationController=Ember.Controller.extend({default_security_setting:2})}(),function(){DataCollectionApp.LocationAddController=Ember.Controller.extend({needs:["application"],types:["Training","Mercy","Evangelism"].map(ArrayMapHelpers.stringToTagObject),areas:["Youth/Children","Campus Ministry","Indigenous Ministry","Prison Ministry","Prostitutes Ministry","Orphanage","Women","Urban","Hospital","Media/Communications","Worship","Community Development","Bible Studies","Church Planting","Arts/Entertainment/Sports","Counseling","Healthcare","Maintenance/Construction"].map(ArrayMapHelpers.stringToTagObject),security_level_options:[Ember.Object.create({level:0,name:"Everybody"}),Ember.Object.create({level:1,name:"Only 4k trusted users"}),Ember.Object.create({level:2,name:"Only my group"})],tags:function(){var a=this.get("types").filterProperty("checked",!0).getEach("tag").toArray(),b=this.get("areas").filterProperty("checked",!0).getEach("tag").toArray(),c=a.concat(b);return $("#tags").tagit("removeAll"),$.each(c,function(a,b){$("#tags").tagit("createTag",b)}),c}.property("types.@each.checked","areas.@each.checked"),tagString:function(){return this.get("tags").join(", ")}.property("tags"),createLocation:function(){console.log(this.get("controllers.application.default_security_setting"));var a={tags:[],desc:"No description given",lat:.1,lon:.1,email:"",phone:"",website:"",security_level:this.get("controllers.application.default_security_setting"),created_at:Math.round(+new Date/1e3)},b=this;void 0!==this.get("desc")&&(a.desc=this.get("desc")),void 0!==this.get("tags")&&(a.tags=this.get("tags")),void 0!==this.get("email")&&(a.email=this.get("email")),void 0!==this.get("phone")&&(a.phone=this.get("phone")),void 0!==this.get("website")&&(a.website=this.get("website")),void 0!==this.get("security_level").get("level")&&(a.security_level=this.get("security_level").get("level")),this.set("controllers.application.default_security_setting",a.security_level),navigator.geolocation.getCurrentPosition(function(c){a.lat=c.coords.latitude,a.lon=c.coords.longitude,a.created_at=Math.round(+new Date/1e3),DataCollectionApp.Location.createRecord(a).save(),b.transitionToRoute("/")},function(){console.error("could not find location!")})}})}(),function(){DataCollectionApp.LocationsController=Ember.ArrayController.extend({listView:!1,toggleView:function(){this.set("listView",this.get("listView")?!1:!0)}})}(),function(){DataCollectionApp.SettingsController=Ember.ObjectController.extend({offlineMode:!1,server_root_address:"http://192.237.166.7/api/0.1/",sync:function(){var a=DataCollectionApp.Location.find(),b=0,c=this;console.log(this.server_root_address,this),console.log("Sending "+a.toArray().length+" to the server."),a.forEach(function(a){var d={orig_id:a.get("id"),lat:a.get("lat"),lon:a.get("lon"),desc:a.get("desc"),tags:a.get("tags")};$.ajax({url:c.server_root_address+"location/",method:"post",data:JSON.stringify(d),crossDomain:!0,contentType:"application/json",beforeSend:function(a){a.setRequestHeader("Authorization","ApiKey admin:5e4d3c2b1a")},complete:function(){}}),b++}),console.log("Sent "+b+"/"+a.toArray().length+" to the server.")}})}(),function(){DataCollectionApp.Store=DS.Store.extend({revision:13,adapter:DS.LSAdapter.create()}),DS.JSONTransforms.array={serialize:function(a){return Em.isNone(a)?[]:a},deserialize:function(a){return Em.isNone(a)?[]:a}}}(),function(){DataCollectionApp.Location=DS.Model.extend({tags:DS.attr("array"),desc:DS.attr("string"),lat:DS.attr("number"),lon:DS.attr("number"),email:DS.attr("string"),phone:DS.attr("string"),website:DS.attr("string"),security_level:DS.attr("number"),created_at:DS.attr("date"),syncedWithServer:DS.attr("boolean",{defaultValue:!1})})}(),function(){DataCollectionApp.Settings=DS.Model.extend({app_key:DS.attr("string")})}(),function(){DataCollectionApp.ApplicationRoute=Ember.Route.extend()}(),function(){DataCollectionApp.LocationAddRoute=Ember.Route.extend({renderTemplate:function(){this.render("location_add",{into:"application",outlet:"modal"})}})}(),function(){DataCollectionApp.LocationListRoute=Ember.Route.extend({model:function(){return DataCollectionApp.Location.find()},renderTemplate:function(){this.render("location_topbar",{into:"application",outlet:"topbar"}),this.render("location_list")}})}(),function(){DataCollectionApp.LocationMapRoute=Ember.Route.extend({model:function(){return DataCollectionApp.Location.find()},renderTemplate:function(){this.render("location_topbar",{into:"application",outlet:"topbar"}),this.render("location_map")}})}(),function(){DataCollectionApp.Appcode=Ember.Route.extend({model:function(){return DataCollectionApp.Location.find()},setupController:function(){console.log("asd;lk")},renderTemplate:function(){console.log("sup"),this.render("settings_app_code")}})}(),function(){DataCollectionApp.SettingsRoute=Ember.Route.extend({renderTemplate:function(){this.render("settings",{into:"application",outlet:"modal",controller:"settings"})},activate:function(){$(".main").addClass("showingSettings"),$(".settingToggle").attr("href","#/")},deactivate:function(){$(".main").removeClass("showingSettings"),$(".settingToggle").attr("href","#/settings")}})}(),function(){DataCollectionApp.LocationAddView=Ember.View.extend({templateName:"location_add",didInsertElement:function(){$("#tags").tagit({removeConfirmation:!0})}})}(),function(){DataCollectionApp.LocationMapView=Ember.CollectionView.extend({map:null,classNames:["google-maps"],didInsertElement:function(){var a={disableDefaultUI:!0,zoom:14,center:new google.maps.LatLng(52.370216,4.895168),mapTypeId:google.maps.MapTypeId.ROADMAP};this.set("map",new google.maps.Map(this.$()[0],a)),this.renderMarkers()},renderMarkers:function(){var a=this;this.get("controller.content").forEach(function(b){new google.maps.Marker({position:new google.maps.LatLng(b.get("lat"),b.get("lon")),map:a.get("map"),title:b.desc})})}.observes("controller.content.@each")})}(),function(){DataCollectionApp.Router.map(function(){this.resource("location.map",{path:"/"}),this.resource("location.list",{path:"/list"}),this.resource("location.add",{path:"/add"}),this.resource("settings",{path:"/settings"}),this.resource("settings.app_code",{path:"/settings/new_validation_code"}),this.resource("settings.about",{path:"/settings/about"}),this.resource("settings.feedback",{path:"/settings/feedback"})})}(),function(){console.log("hallo")}();