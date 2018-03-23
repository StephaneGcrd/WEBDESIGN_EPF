// Auteurs: Boris Boeri & Guichard Stéphane 
var slider = document.getElementById('myRange');
var slider2 = document.getElementById('myRange_deux');



map.on('load', function() {

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    map.addSource('films', {
        "type": "geojson",
        "data": "./data/data_film.geojson"
    });

    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

   map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 10,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                10, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                10, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);

    map.addLayer({
        "id": "heat",
        "type": "heatmap",
        "source": "films",
        "maxzoom": 15,
        "paint": {
            // Augmenter le poids des elements suivant le zoom
            "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                0, 0,
                10, 1
            ],

            // heatmap-intensity est un multiplicateur des poids des elements
            "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 0,
                15, 0.6
            ],
            // Couleurs
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(33,102,172,0)",
                0.2, "rgb(103,169,207)",
                0.4, "rgb(209,229,240)",
                0.6, "rgb(253,219,199)",
                0.8, "rgb(239,138,98)",
                1, "rgb(178,24,43)"
            ],
            // Rayon des elements de la heat map suivant le niveau de zoom
            "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 2,
                15, 10
            ],

            'heatmap-opacity': [
               "interpolate",
                ["linear"],
                ["zoom"],
                14, 1,
                15, 0,


            ],


        }

    }, 'waterway-label');

        map.addLayer({
        "id": "circle_data",
        "type": "circle",
        "source": "films",
        "maxzoom": 24,
        "paint": {
            // apparition des cercles apres un certain zoom
            'circle-opacity': [
               "interpolate",
                ["linear"],
                ["zoom"],
                14, 0,
                15, 1,

            ],
            'circle-stroke-opacity': [
               "interpolate",
                ["linear"],
                ["zoom"],
                14, 0,
                15, 1,

            ],
            // Couleurs
            'circle-stroke-color': "#FFFFFF",
            "circle-stroke-width": 2



        }

    }, 'waterway-label');

    slider.addEventListener('input', function(e) {
        // Listener pour ajuster le heatmap-radius avec le slider detail
        map.setPaintProperty('heat', 'heatmap-radius', parseInt(50 - e.target.value));
    });

    slider2.addEventListener('input', function(e) {
        // Listener pour ajuster le heatmap-intensity avec le slider intensité
        map.setPaintProperty('heat', 'heatmap-intensity', e.target.value / 100);
        console.log(e.target.value / 100);
    });

map.on('click', function(e) {
  //fonction pour afficher un pop up quand l'utilisateur clique sur un element de la carte
    var features = map.queryRenderedFeatures(e.point, { layers: ['circle_data'] });

    // si un element n'a pas d'info, ne retourne rien
    if (!features.length) {
      return;
    }

    var feature = features[0];


    var popup = new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<div id=\'popup\' class=\'popup\' style=\'z-index: 10;\'>  '+ feature.properties.titre+
    '<ul class=\'list-group\'>' +
    '<li class=\'list-group-item\'> Réalisateur: ' + feature.properties.realisateur + ' </li>'+
    '<li class=\'list-group-item\'> Date de fin de tournage: ' + feature.properties.date_fin + ' </li>'+
    '<li class=\'list-group-item\'> Type de tournage: ' + feature.properties.type_de_tournage + ' </li>')
    .addTo(map);
});

// Fonction pour indiquer que les pop up sont cliquables ( affichage pointeur)
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['circle_data'] });
  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
});


});
