
# **Projet Webdesign réalisé pour l'EPF**

Auteurs: **Boris Boéri** et **Stéphane Guichard**

*4ème année, Majeure Ingénierie et Numérique*

## **Fonctionalités implémentées**

* **ng-app et ng-controlleur**

Ces deux directives permettent d'indiquer que l'application angular et le controlleur vont s'appliquer sur le html écrit dans la div dans lequel elles sont appelées.

* **ng-if**

ng-if à été utilisé dans liste.html pour afficher nos filtres, çela permet d'afficher les différents filtres disponibles pour la
liste si et seulement si l'utilisateur clique sur le bouton filtre.

```html
<div class="row filters" ng-if="bool">
...
</div>
```

Sur le bouton filtre, la directive ng-click est utilisée pour changer la valeur de la variable bool

```html
<a class="nav-link" ng-click="bool=!bool" href="">
<div class="navbt">
<div class="navbtint">Filtres</div>
</div>
</a>
```
* **ng-show**

De même que pour ng-if, ng-show permet d'afficher ou cacher un élément suivant certaines conditions. Il a été utilisé pour
afficher ou cacher le bouton précédent suivant le numéro de la page
```html
<div class="pages_bt animbt col-5 col-md-2 col-lg-1" ng-show="start!=0" ng-click="start=start-15;end=end-15;numero_page=numero_page-1;" >Precedent</div>
```
Ici, le ng-show indique que le bouton n'apparait que quand la variable start est différente de 0, c'est à dire quand le site n'affiche
pas la page 1.

* **ng-class**

La directive ng-class à été utilisée afin de changer le CSS d'un élément lorsqu'on coche une case. Pour ce site, un bouton
favori à été implanté, et lorsqu'il est coché, le div contenant les éléments d'un film change de style.

La directive ng-model est utilisée pour definir le checkbox comme modèle angular
```html
<div class="row favoris">
Favoris<input type="checkbox" ng-model="fav_check">
</div>
```
Enfin ng-class est utilisé sur le div pour lequel le style va être changé
```html
<div ng-class="{favoris_active:fav_check}" ... >
```
* **ng-repeat**

La directive ng-repeat à été utilisée pour afficher tout les éléments de la liste que nous souhaitons afficher.
```html
<div ... ng-repeat="films in listev.list | filter:searchText | orderBy: listev.order_by | startFrom:start:end " >
```
Dans le div utilisant la directive ng-repeat, les éléments de la liste à afficher sont écrits:
```html
<div class="row favoris">
Favoris<input type="checkbox" ng-model="fav_check">
</div>
<div  class="row" >
<div  class="col-5 col-md-5 col-lg-4 tab_content"><p>{{films.fields.titre}}</p></div>
<div  class="col-4 col-md-4 col-lg-4 tab_content"><p>{{films.fields.realisateur }}</p></div>
<div  class="col-3 col-md-3 col-lg-4 tab_content"><p>{{films.fields.date_debut | date : "dd/MM/yy" }}</p></div>
</div>
</div>
```

* **ng-click, ng-model**
Ces deux directives sont utilisées comme présenté plus haut.

* **Filtres angular**
Des filtres natifs à angular ont été utilisés pour ce projet, ainsi qu'un filtre custom.
Pour les filtres natifs, le filtre orderBy à été utilisé, il permet de trier une liste par ordre croissant ou décroissant suivant un élément de la liste.

On peut voir ici que l'on propose 4 filtres différents : par titre, realisateur, date de début, et arrondissement (à Paris)
```html
<div class="row filters" ng-if="bool">
<div class="col-2 col-md-2 col-lg-1 filter_bt" ng-click="listev.order_by='fields.titre'" >
Titre</div>
<div class="col-3 col-md-2 col-lg-2 filter_bt" ng-click="listev.order_by='fields.realisateur'" >
Auteur </div>
<div class="col-2 col-md-2 col-lg-1 filter_bt" ng-click="listev.order_by='fields.date_debut'" >
Arr.</div>
<div class="col-2 col-md-2 col-lg-1 filter_bt" ng-click="listev.order_by='fields.ardt'" >
Date</div>
<div class="col-3 col-md-0"></div>
</div>
```
Le filtre searchText, qui permet de chercher un élément dans la liste, à été utilisé. Pour cela, la directive ng-model a été appelée sur le formulaire input de recherce.
```html
<form class="form-inline my-2 my-lg-0">
<input class="form-control my-1 mr-sm-1 mr-md-3" ng-model="searchText" type="text" placeholder="Rechercher...">
</form>
```
Pour le filtre **custom**, un filtre qui retourne une partie de l'array a été programmé, avec la fonction slice.
Il est écrit dans le fichier script.js, juste avant notre controlleur:
```javascript
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
```
Ce filtre permet de paginer la liste, car il retourne un nombre exact d'élément suivant deux indices: start et end, qui sont eux définis par les boutons précédent et suivant.


Les différents filtres sont ensuite appelés avec la liste de films dans la directive ng-repeat :
```html
ng-repeat="films in listev.list | filter:searchText | orderBy: listev.order_by | startFrom:start:end "
"
```

## **Fonctionalités bonus**

**ng-animate**

Afin d'animer le site, le module angular-animate a été utilisé.
Elle est importée au début de notre script.
```html
(function() {
//definition du module angular
angular.module('liste',['ngAnimate']);
} ) ();
```

Des animations sont ensuite définies dans le CSS, par exemple ici pour les changements dans
les éléments affichés par la directive ng-repeat :
```css
.item.ng-move,
.item.ng-enter {
-webkit-transition:opacity ease 0.4s,margin-left ease 0.4s;
transition: opacity ease 0.4s,margin-left ease 0.4s;
}
.item.ng-leave.ng-leave-active,
.item.ng-move,
.item.ng-enter {
opacity:0;
margin-left: 3%;
}
.item.ng-leave,.item.ng-move.ng-move-active,
.item.ng-enter.ng-enter-active {
opacity:1;
margin-left: 0px;
}
```

## **Fonctionalités non implémentées**

La directive **ng-submit** n'a pas été utilisée.

## **Informations supplémentaires**

Angular 1.2 à été utilisé afin d'avoir une version angular-animate compatible, et en utilisant des liens d'importation de libraire. nous aurions plus utiliser des versions plus récentes mais il aurait fallu installer node.js et donc nous avons fait le choix de rester sur l'ancienne version.

