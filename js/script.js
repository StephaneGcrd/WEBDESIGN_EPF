(function() {
	//definition du module angular
		angular.module('liste',['ngAnimate']);
} ) ();


(function(){

	angular.module('liste').filter('startFrom', function() {
	return function(input,start,end) {
		//ce filtre custom nous permet d'obtenir une partie de l'array contenant
		//nos données
		//il permettra d'afficher nos données page par page
			return input.slice(start,end)
			};
	})
	.controller('listeViewer', ['$http', function($http){
		var _this=this;
		this.list=[];
		this.len= 0;
		$http.get('./data/tournage.json')
		.success(function(data){
			console.log(data);
			_this.list=data;
			_this.len= data.length;
		});

	}]);
}) ();




//permet d'ouvrir le sidenav
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* permet de fermer le sidenav */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
